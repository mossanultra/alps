import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../firebaseAdmin";

export interface Chat {
  userName: string;
  userIcon: string;
  userId?: string;
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
    const pagingId = searchParams.get("pagingId");
    const lat = parseFloat(searchParams.get("lat") || "0");
    const lng = parseFloat(searchParams.get("lng") || "0");

    if (isNaN(lat) || isNaN(lng)) {
      return NextResponse.json(
        { error: "有効な緯度と経度が必要です" },
        { status: 400 }
      );
    }

    let query = db
      .collection("chats")
      .where("lat", "==", lat)
      .where("lng", "==", lng)
      .orderBy("createdAt", "desc")
      .limit(20);

    // pagingIdがある場合のクエリ範囲指定
    if (pagingId) {
      const pagingDoc = await db.collection("chats").doc(pagingId).get();
      if (pagingDoc.exists) {
        query = query.startAfter(pagingDoc);
      } else {
        return NextResponse.json({ error: "ページングデータが存在しません" }, { status: 404 });
      }
    }

    const querySnapshot = await query.get();

    // 非同期処理でデータを取得
    const _chats: Chat[] = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const data = doc.data();
        const userId = data.userId;

        let userIcon = data.userIcon;
        let userName = data.userName;
        if (userId) {
          const profileSnapshot = await db
            .collection("profile")
            .where("userId", "==", userId)
            .get();

          if (!profileSnapshot.empty) {
            const profileData = profileSnapshot.docs[0].data();
            userIcon = profileData?.userIcon || userIcon;
            userName = profileData?.userName || userName;
          }
        }

        return {
          userName: userName,
          userIcon: userIcon,
          text: data.text,
          createdAt: data.createdAt,
          id: doc.id,
          lat: data.lat,
          lng: data.lng,
          userId: userId
        };
      })
    );

    // 作成日時で昇順に並べ替え
    _chats.sort((a, b) => {
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

// 新しいチャットを作成
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const text = formData.get("text");
    const userName = formData.get("userName");
    const lat = parseFloat(formData.get("lat") as string);
    const lng = parseFloat(formData.get("lng") as string);
    const userId = formData.get("userId");

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "テキストが必要です" }, { status: 400 });
    }

    if (!userName || typeof userName !== "string") {
      return NextResponse.json({ error: "userNameが必要です" }, { status: 400 });
    }

    if (isNaN(lat) || isNaN(lng)) {
      return NextResponse.json(
        { error: "有効な緯度と経度が必要です" },
        { status: 400 }
      );
    }

    const iconUrl = getUserIcon(userName);
    const chat = {
      text,
      userName,
      userIcon: iconUrl,
      lat,
      lng,
      createdAt: new Date().toISOString(),
      userId,
    };

    // Firestoreに投稿データを保存
    await db.collection("chats").add(chat);

    return NextResponse.json({ message: "投稿が正常に保存されました" });
  } catch (error) {
    console.error("投稿のアップロード中にエラーが発生しました:", error);
    return NextResponse.json(
      { error: "投稿のアップロード中にエラーが発生しました" },
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

