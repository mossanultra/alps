import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

const posts: { guid: string; text: string; imageBase64: string }[] = [];

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const text = formData.get("text") as string;
  const imageFile = formData.get("image") as File;

  if (!text || !imageFile) {
    return NextResponse.json({ error: "Text and image are required" }, { status: 400 });
  }

  const guid = uuidv4();
  const buffer = Buffer.from(await imageFile.arrayBuffer());
  const base64Image = buffer.toString("base64");

  // 画像のMIMEタイプを適切に設定
  const imageBase64 = `data:image/${imageFile.type.split("/")[1]};base64,${base64Image}`;

  posts.push({ guid, text, imageBase64 });

  return NextResponse.json({ guid, imageBase64 });
}

export async function GET() {
  return NextResponse.json(posts);
}
