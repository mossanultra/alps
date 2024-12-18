import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../../firebaseAdmin";

// 投稿データの型定義
interface PostData {
  guid: string;
  text: string;
  imageBase64: string;
}

// 画像データをBase64文字列として保存するAPI
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const text = formData.get("text");
    const imageFile = formData.get("image");

    if (!text || typeof text !== "string" || !imageFile || !(imageFile instanceof File)) {
      return NextResponse.json({ error: "テキストと画像が必要です" }, { status: 400 });
    }

    const guid = uuidv4();

    // 画像をBase64文字列に変換
    const buffer = await imageFile.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");

    // 画像のMIMEタイプを適切に設定
    const imageBase64 = `data:${imageFile.type};base64,${base64Image}`;

    // 投稿データを作成
    const postData: PostData = {
      guid,
      text,
      imageBase64,
    };

    // Firestoreに投稿データを保存
    const postsCollection = db.collection("posts");
    await postsCollection.add(postData);

    return NextResponse.json({ guid, message: "投稿が正常に保存されました" });
  } catch (error) {
    console.error("投稿のアップロード中にエラーが発生しました:", error);
    return NextResponse.json({ error: "投稿のアップロード中にエラーが発生しました" }, { status: 500 });
  }
}

// 投稿一覧を取得するAPI
export async function GET() {
  try {
    const querySnapshot = await db.collection("media").get();

    // Firestoreから取得したドキュメントをPostData型に変換
    const posts: PostData[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        guid: data.id,
        text: data.text,
        imageBase64: data.imageBase64,
        imgSrc:data.imgSrc,
        href:data.href,
        savedAt:data.savedAt,
      };
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("投稿の取得中にエラーが発生しました:", error);
    return NextResponse.json({ error: "投稿の取得中にエラーが発生しました" }, { status: 500 });
  }
}
