import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../firebaseAdmin";

export interface Chat {
  userName: string;
  userIcon: string;
  text: string;
  createdAt: string; // ISO形式のタイムスタンプ
  id: string;
  lng: number;
  lat: number;
}

// 登録されているチャットメッセージのリストを取得（作成順）
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const pagingId = searchParams.get("pagingId"); // クエリパラメータからIDを取得
    const lng = searchParams.get("lng"); // クエリパラメータからIDを取得
    const lat = searchParams.get("lat"); // クエリパラメータからIDを取得

    console.log('lat',Number(lat));
    console.log('lng',Number(lng))
    let query = db
    .collection("chats")
    .where('lat', '==' , Number(lat))
    .where('lng', '==' , Number(lng))
    .orderBy("createdAt", "desc").limit(20);

    // pagingIdがある場合は指定されたドキュメント以降のデータを取得
    if (pagingId) {
      const pagingDoc = await db.collection("chats").doc(pagingId).get();
      if (pagingDoc.exists) {
        query = query.startAfter(pagingDoc);
      } else {
        return NextResponse.json({ error: "no data" }, { status: 404 });
      }
    }

    const querySnapshot = await query.get();

    const _chats: Chat[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        userName: data.userName,
        userIcon: data.userIcon,
        text: data.text,
        createdAt: data.createdAt,
        id: doc.id,
        lat: data.lat,
        lng: data.lng,
      };
    });

    // 作成日時で昇順に並べ替え
    _chats.sort((a: Chat, b: Chat) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

    return NextResponse.json(_chats);
  } catch (error) {
    console.error("データの取得中にエラーが発生しました:", error);
    return NextResponse.json(
      { error: "データの取得中にエラーが発生しました" },
      { status: 500 }
    );
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
    const lat = formData.get("lat");
    const lng = formData.get("lng");

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
      lat: Number(lat),
      lng: Number(lng),
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
