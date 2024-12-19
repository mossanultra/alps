import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../firebaseAdmin";

export interface Point {
  lat: number;
  lng: number;
  id: string;
  read?: boolean;
}

// 登録されている座標のリスト
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const querySnapshot = await db.collection("points").get();

    // Firestoreから取得したドキュメントをPoint型に変換
    const points = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const data = doc.data();
        const point: Point = {
          lat: data.lat,
          lng: data.lng,
          id: doc.id,
        };

        const lastCreatedAt = await getLastCreatedAt(point.lat, point.lng);
        if (!lastCreatedAt || !userId) {
          // メッセージがない場合やuserIdがない場合は既読
          return { ...point, read: true };
        }

        const lastReadAt = await getLastReadAt(userId, point.lat, point.lng);
        if(!lastReadAt){
          return { ...point, read: false };
        }
        return { ...point, read: lastCreatedAt < lastReadAt };
      })
    );

    return NextResponse.json(points);
  } catch (error) {
    console.error("エラーが発生しました:", error);
    return NextResponse.json(
      { error: "データの取得中にエラーが発生しました" },
      { status: 500 }
    );
  }
}

// ポイントをFirestoreに登録する
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const lat = formData.get("lat");
    const lng = formData.get("lng");

    if (!lat || typeof lat !== "string") {
      return NextResponse.json({ error: "latが必要です" }, { status: 400 });
    }
    if (!lng || typeof lng !== "string") {
      return NextResponse.json({ error: "lngが必要です" }, { status: 400 });
    }

    const point = {
      lat: Number(lat),
      lng: Number(lng),
      createdAt: new Date().toISOString(), // ISO形式のタイムスタンプ
    };

    // Firestoreに投稿データを保存
    const postsCollection = db.collection("points");
    await postsCollection.add(point);

    return NextResponse.json({ message: "投稿が正常に保存されました" });
  } catch (error) {
    console.error("投稿のアップロード中にエラーが発生しました:", error);
    return NextResponse.json(
      { error: "投稿のアップロード中にエラーが発生しました" },
      { status: 500 }
    );
  }
}

// 最後に作成されたメッセージの作成日時を取得
async function getLastCreatedAt(lat: number, lng: number): Promise<string | null> {
  const querySnapshot = await db
    .collection("chats")
    .where("lat", "==", lat)
    .where("lng", "==", lng)
    .orderBy("createdAt", "desc")
    .limit(1)
    .get();
  if (querySnapshot.empty) {
    return null;
  }
  const lastRecord = querySnapshot.docs[0].data();
  return lastRecord.createdAt;
}

// 最後に既読した日時を取得
async function getLastReadAt(userId: string, lat: number, lng: number): Promise<string | null> {
  const querySnapshot = await db
    .collection("lastReadAt")
    .where("userId", "==", userId)
    .where("lat", "==", lat)
    .where("lng", "==", lng)
    .get();
  if (querySnapshot.empty) {
    return null;
  }
  const lastReadAt = querySnapshot.docs[0].data();
  return lastReadAt.lastReadAt;
}
