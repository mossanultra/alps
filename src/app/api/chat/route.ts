import { NextResponse } from "next/server";
import { chats } from "./data";

export interface Chat {
  userName: string;
  userIcon: string;
  text: string;
}

// 登録されている座標のリスト
export async function GET() {
  try {
    const _chats: Chat[] = chats.map((m: { userName: any; userIcon: any; text: any; }) => {
      return({userName: m.userName,userIcon: m.userIcon, text: m.text})
    })

    return NextResponse.json(_chats);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
