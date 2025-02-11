import vision from "@google-cloud/vision";
import { NextRequest, NextResponse } from "next/server";
import { GoogleAuth } from "google-auth-library";
import { VisionResponse, ExerciseGroup } from "./types/ocr";

const googleCredentials = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;

if (!googleCredentials) {
  throw new Error("GOOGLE_APPLICATION_CREDENTIALS_JSON is not set in environment variables");
}

// JSON をパースして認証情報として使用
const auth = new GoogleAuth({
  credentials: JSON.parse(googleCredentials),
});

// API ルートで multipart/form-data を扱うため、Next.js の bodyParser を無効化する
export const config = {
  api: {
    bodyParser: false,
  },
};

// --- 型定義 ---
async function extractDate(texts: string[]): Promise<string | null> {
  const dateRegex = /\b(\d{4}[\/-]\d{1,2}[\/-]\d{1,2})\b/;
  
  for (const text of texts) {
    const match = text.match(dateRegex);
    if (match) {
      return match[1]; // 最初に見つかった日付を返す
    }
  }
  return null;
}

// --- OCR 結果（VisionResponse）の各テキストトークンを行単位に整形する ---
function groupTextAnnotations(response: VisionResponse): string[] {
  // 最初の要素は全体の認識結果のため、2 番目以降の要素を個々のトークンとする
  const tokens = response.textAnnotations.slice(1);

  type TokenWithPos = { text: string; x: number; y: number };
  const tokensWithPos: TokenWithPos[] = tokens.map((token) => {
    const yValues = token.boundingPoly.vertices.map((v) => v.y ?? 0);
    const avgY = yValues.reduce((sum, y) => sum + y, 0) / yValues.length;
    const xValues = token.boundingPoly.vertices.map((v) => v.x ?? 0);
    const minX = Math.min(...xValues);
    return { text: token.description ?? "", x: minX, y: avgY };
  });

  // Y 座標でソート（同じ行内なら X 順）
  tokensWithPos.sort((a, b) => {
    if (Math.abs(a.y - b.y) < 10) {
      return a.x - b.x;
    }
    return a.y - b.y;
  });

  const lineThreshold = 10; // この値以内なら同じ行とみなす
  const lines: TokenWithPos[][] = [];

  tokensWithPos.forEach((token) => {
    let placed = false;
    for (const line of lines) {
      const avgLineY = line.reduce((sum, t) => sum + t.y, 0) / line.length;
      if (Math.abs(token.y - avgLineY) < lineThreshold) {
        line.push(token);
        placed = true;
        break;
      }
    }
    if (!placed) {
      lines.push([token]);
    }
  });

  // 各行内は X 順に連結して 1 行の文字列とする
  const outputLines = lines.map((line) => {
    line.sort((a, b) => a.x - b.x);
    return line.map((t) => t.text).join(" ");
  });

  return outputLines;
}

// --- 行単位のテキストから種目名とセット情報（重量・reps）を抽出する ---
function extractExercises(lines: string[]): ExerciseGroup[] {
  const groups: ExerciseGroup[] = [];
  let currentGroup: ExerciseGroup | null = null;

  // 種目名の行は "RM : ～kg" の形式と仮定（例："ラット プルダウン RM : 24.7kg"）
  const headerRegex = /^(.*?)\s+RM\s*:\s*([\d.]+)\s*kg$/;
  // セット情報の行は "（任意の数字） kg x （数字） reps" を含む行とする
  const setRegex = /^(?:\d+\s+)?([\d.]+)\s*kg\s*x\s*(\d+)\s*reps/i;

  for (const line of lines) {
    const trimmed = line.trim();
    const headerMatch = trimmed.match(headerRegex);
    if (headerMatch) {
      currentGroup = { name: headerMatch[1].trim(), sets: [] };
      groups.push(currentGroup);
      continue;
    }
    const setMatch = trimmed.match(setRegex);
    if (setMatch && currentGroup) {
      currentGroup.sets.push({ weight: setMatch[1], reps: setMatch[2] });
      continue;
    }
    // その他の行は無視
  }

  return groups;
}

// --- Next.js API ハンドラー ---
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const image = formData.get("image");
  if (!image) {
    return NextResponse.json({ message: "No image file provided" },
      { status: 400 });
  }
  // image to Buffer
  const buffer = await (image as Blob).arrayBuffer();
    try {
      // Vision API クライアントを作成
      const client = new vision.ImageAnnotatorClient({ auth });

      // 画像から OCR を実行
      const [result] = await client.textDetection(Buffer.from(buffer));
      const textAnnotations = result.textAnnotations;

      if (textAnnotations && textAnnotations.length > 0) {
        // Vision API の結果を VisionResponse 型に変換
        const visionResponse: VisionResponse = {
          textAnnotations: textAnnotations.map((annotation) => ({
            description: annotation.description ?? "",
            boundingPoly: {
              vertices: (annotation.boundingPoly?.vertices || []).map((v) => ({
                x: v.x === null || v.x === undefined ? undefined : v.x,
                y: v.y === null || v.y === undefined ? undefined : v.y,
              })),
              normalizedVertices: annotation.boundingPoly?.normalizedVertices || undefined,
            },
          })),
        };

        // OCR 結果から行単位に整形
        const lines = groupTextAnnotations(visionResponse);
        // 行単位のテキストからエクササイズ情報を抽出
        const exercises = extractExercises(lines);
        const extractedDate = await extractDate(lines);

        // JSON で抽出結果を返却
        return NextResponse.json({ date: extractedDate , exercises },
          { status: 200 });
      } else {
        return NextResponse.json({ exercises: [] },
          { status: 200 });
      }
    } catch (error) {
      console.error("OCR processing error:", error);
      return NextResponse.json({ message: "OCR processing error" },
        { status: 500 });
    }
  }

