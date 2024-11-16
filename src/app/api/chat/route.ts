import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../firebaseAdmin";

export interface Chat {
  userName: string;
  userIcon: string;
  text: string;
  createdAt: string; // ISO形式のタイムスタンプ
}

// 登録されているチャットメッセージのリストを取得（作成順）
export async function GET() {
  try {
    const querySnapshot = await db
      .collection("chats")
      .orderBy("createdAt", "desc") // 作成順に並べ替え
      .limit(20)
      .get();
  

    const _chats: Chat[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        userName: data.userName,
        userIcon: data.userIcon,
        text: data.text,
        createdAt: data.createdAt,
      };
    });

    _chats.sort((a: Chat, b: Chat) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
        return NextResponse.json(_chats);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

// ユーザーアイコン取得関数
function getUserIcon(userName: string) {
  if (userName === "もずく") {
    return "https://pbs.twimg.com/profile_images/1597336893019934720/o_byHBVW_400x400.jpg";
  } else if (userName === "まほ") {
    return "https://pbs.twimg.com/profile_images/1852191679215996928/FHxV4OqS_400x400.jpg";
  } else {
    return "https://pbs.twimg.com/media/GHyhV0pasAA4dDZ?format=png&name=900x900";
  }
}

// 新しいチャットを作成
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const text = formData.get("text");
    const username = formData.get("userName");

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "テキストが必要です" },
        { status: 400 }
      );
    }
    if (!username || typeof username !== "string") {
      return NextResponse.json(
        { error: "usernameが必要です" },
        { status: 400 }
      );
    }
    const iconUrl = getUserIcon(username);

    if (!iconUrl || typeof iconUrl !== "string") {
      return NextResponse.json({ error: "iconUrlが必要です" }, { status: 400 });
    }

    const chat = {
      text: text,
      userName: username,
      userIcon: iconUrl,
      createdAt: new Date().toISOString(), // ISO形式のタイムスタンプ
    };

    // Firestoreに投稿データを保存
    const postsCollection = db.collection("chats");
    await postsCollection.add(chat);

    return NextResponse.json({ message: "投稿が正常に保存されました" });
  } catch (error) {
    console.error("投稿のアップロード中にエラーが発生しました:", error);
    return NextResponse.json(
      { error: "投稿のアップロード中にエラーが発生しました" },
      { status: 500 }
    );
  }
}
