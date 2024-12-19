import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebaseAdmin";

// 最終既読日を取得
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const lng = searchParams.get("lng");
    const lat = searchParams.get("lat");

    const querySnapshot = await db
    .collection("lastReadAt")
    .where('userId', '==' , userId)
    .where('lat', '==' , Number(lat))
    .where('lng', '==' , Number(lng)).get();

    if (querySnapshot.empty) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }

    const lastRecord = querySnapshot.docs[0].data();

    return NextResponse.json(lastRecord.lastReadAt);
  } catch (error) {
    console.error("データの取得中にエラーが発生しました:", error);
    return NextResponse.json(
      { error: "データの取得中にエラーが発生しました" },
      { status: 500 }
    );
  }
}
// 最終既読日を登録OR更新
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const userId = formData.get("userId");
    const lat = formData.get("lat");
    const lng = formData.get("lng");

    if (!userId || typeof userId !== "string") {
      return NextResponse.json(
        { error: "テキストが必要です" },
        { status: 400 }
      );
    }
    const lastReadAt = {
      userId: userId,
      lat: Number(lat),
      lng: Number(lng),
      lastReadAt: new Date().toISOString(), // ISO形式のタイムスタンプ
    };

    // Firestoreに投稿データを保存
    const postsCollection = db.collection("lastReadAt");
    await postsCollection.add(lastReadAt);

    return NextResponse.json({ message: "最終既読時間を更新しました" });
  } catch (error) {
    console.error("エラーが発生しました:", error);
    return NextResponse.json(
      { error: "エラーが発生しました" },
      { status: 500 }
    );
  }
}
