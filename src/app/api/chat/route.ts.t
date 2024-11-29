import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export interface Chat {
  userName: string;
  userIcon: string;
  text: string;
  createdAt: string; // ISO形式のタイムスタンプ
  id: string;
}

// サンプルのユーザー名リスト
const sampleUserNames = ["もずく", "まほ", "たける", "さくら", "しんじ"];
// サンプルのメッセージリスト
const sampleMessages = [
  "こんにちは！",
  "今日はいい天気ですね。",
  "もずく大好き。",
  "新しい趣味を始めました！",
  "これ、どう思いますか？",
];

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

// ランダムなチャットデータを生成
function generateRandomChats(): Chat[] {
  const chats: Chat[] = [];
  for (let i = 0; i < 20; i++) {
    const userName =
      sampleUserNames[Math.floor(Math.random() * sampleUserNames.length)];
    const text =
      `${i} + ${sampleMessages[Math.floor(Math.random() * sampleMessages.length)]}`;
    const userIcon = getUserIcon(userName);

    chats.push({
      userName,
      userIcon,
      text,
      createdAt: new Date(Date.now() - Math.random() * 1000000000).toISOString(), // 過去のランダムな時刻
      id: uuidv4(), // ランダムなUUIDを生成
    });
  }
  return chats.sort(
    (a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() // 作成日時で昇順ソート
  );
}

// 登録されているチャットメッセージのリストを取得（作成順）
export async function GET() {
  try {
    const chats = generateRandomChats();
    return NextResponse.json(chats);
  } catch (error) {
    console.error("データの生成中にエラーが発生しました:", error);
    return NextResponse.json({ error: "データの生成中にエラーが発生しました" }, { status: 500 });
  }
}
