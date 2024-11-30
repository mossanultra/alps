import { NextRequest, NextResponse } from "next/server"; 
import { db } from "../../../firebaseAdmin";

export interface Point {
  lat: number;
  lng: number;
  id: string;
}

// 登録されている座標のリスト
export async function GET() {
  try {
    const querySnapshot = await db.collection("points").get();

    // Firestoreから取得したドキュメントをPostData型に変換
    const points: Point[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        lat: data.lat,
        lng: data.lng,
        id: doc.id,
      };
    });
    return NextResponse.json(points);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const lat = formData.get("lat");
    const lng = formData.get("lng");

    if (!lat || typeof lat !== "string") {
      return NextResponse.json(
        { error: "latが必要です" },
        { status: 400 }
      );
    }
    if (!lng || typeof lng !== "string") {
      return NextResponse.json(
        { error: "lngが必要です" },
        { status: 400 }
      );
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
