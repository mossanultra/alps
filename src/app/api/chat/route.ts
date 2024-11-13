import { NextRequest, NextResponse } from "next/server";

export interface Chat {
  userName: string;
  userIcon: string;
  text: string;
}

const chats = [
  {
    userName: 'タイラさん',
    userIcon: 'https://pbs.twimg.com/media/Fp8zwAlagAE1i-Z.jpg',
    text: "なるとピンク！！！！！ぽけぽけ！",
  },
  {
    userName: 'PMさん',
    userIcon: 'https://pbs.twimg.com/media/Fp8zwAlagAE1i-Z.jpg',
    text: "たまごかけごはんもぐもぐ",
  },
  {
    userName: 'めかぶさん',
    userIcon: 'https://pbs.twimg.com/media/Fp8zwAlagAE1i-Z.jpg',
    text: "まっちょりー",
  },
  {
    userName: 'ももち',
    userIcon: 'https://pbs.twimg.com/media/Fp8zwAlagAE1i-Z.jpg',
    text: "たまごかけごはんに酢かけちゃった！！",
  },
  {
    userName: '背脂クリーム',
    userIcon: 'https://pbs.twimg.com/media/Fp8zwAlagAE1i-Z.jpg',
    text: "背脂クリーム！！",
  },
  {
    userName: 'コス丸',
    userIcon: 'https://pbs.twimg.com/media/Fp8zwAlagAE1i-Z.jpg',
    text: "タイラーメンズ！！",
  },
  {
    userName: 'taira',
    userIcon: 'https://pbs.twimg.com/media/Fp8zwAlagAE1i-Z.jpg',
    text: "まっちょりー",
  },
  {
    userName: 'もずく',
    userIcon: 'https://pbs.twimg.com/profile_images/1597336893019934720/o_byHBVW_400x400.jpg',
    text: "ぱんだかわいいよね",
  },
  {
    userName: 'あび',
    userIcon: 'https://pbs.twimg.com/media/Fp8zwAlagAE1i-Z.jpg',
    text: "はだかくつしたは制服",
  },
];


// 登録されている座標のリスト
export async function GET() {
  try {
    const _chats: Chat[] = chats.map((m) => {
      return({userName: m.userName,userIcon: m.userIcon, text: m.text})
    })

    return NextResponse.json(_chats);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const text = formData.get("text");
    const username = formData.get("userName");
    const iconUrl = 'https://pbs.twimg.com/profile_images/1597336893019934720/o_byHBVW_400x400.jpg';

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "テキストが必要です" }, { status: 400 });
    }
    if (!username || typeof username !== "string") {
      return NextResponse.json({ error: "usernameが必要です" }, { status: 400 });
    }
    if (!iconUrl || typeof iconUrl !== "string") {
      return NextResponse.json({ error: "iconUrlが必要です" }, { status: 400 });
    }
    chats.push({
      text:text, 
      userName: username,
      userIcon: iconUrl
    })
    // Firestoreに投稿データを保存
    // const postsCollection = db.collection("posts");
    // await postsCollection.add(postData);

    return NextResponse.json({ message: "投稿が正常に保存されました" });
  } catch (error) {
    console.error("投稿のアップロード中にエラーが発生しました:", error);
    return NextResponse.json({ error: "投稿のアップロード中にエラーが発生しました" }, { status: 500 });
  }
}