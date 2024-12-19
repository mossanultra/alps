import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebaseAdmin";

// 最終既読日を取得
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    if (!userId || !lat || !lng) {
      return NextResponse.json({ error: "パラメータが不足しています" }, { status: 400 });
    }

    const querySnapshot = await db
      .collection("lastReadAt")
      .where("userId", "==", userId)
      .where("lat", "==", Number(lat))
      .where("lng", "==", Number(lng))
      .get();

    if (querySnapshot.empty) {
      return NextResponse.json({ error: "該当するデータが見つかりません" }, { status: 404 });
    }

    const lastRecord = querySnapshot.docs[0].data();

    return NextResponse.json({ lastReadAt: lastRecord.lastReadAt });
  } catch (error) {
    console.error("データの取得中にエラーが発生しました:", error);
    return NextResponse.json(
      { error: "データの取得中にエラーが発生しました" },
      { status: 500 }
    );
  }
}

// 最終既読日を登録または更新
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const userId = formData.get("userId");
    const lat = formData.get("lat");
    const lng = formData.get("lng");

    if (!userId || typeof userId !== "string") {
      return NextResponse.json({ error: "userIdが必要です" }, { status: 400 });
    }
    if (!lat || typeof lat !== "string") {
      return NextResponse.json({ error: "latが必要です" }, { status: 400 });
    }
    if (!lng || typeof lng !== "string") {
      return NextResponse.json({ error: "lngが必要です" }, { status: 400 });
    }

    const lastReadAt = {
      userId,
      lat: Number(lat),
      lng: Number(lng),
      lastReadAt: new Date().toISOString(), // ISO形式のタイムスタンプ
    };

    const collection = db.collection("lastReadAt");

    // 既存のデータをチェック
    const querySnapshot = await collection
      .where("userId", "==", userId)
      .where("lat", "==", Number(lat))
      .where("lng", "==", Number(lng))
      .get();

    if (!querySnapshot.empty) {
      // レコードが存在する場合は更新
      const docId = querySnapshot.docs[0].id;
      await collection.doc(docId).update(lastReadAt);
      return NextResponse.json({ message: "最終既読時間を更新しました" });
    } else {
      // レコードが存在しない場合は新規作成
      await collection.add(lastReadAt);
      return NextResponse.json({ message: "最終既読時間を登録しました" });
    }
  } catch (error) {
    console.error("エラーが発生しました:", error);
    return NextResponse.json(
      { error: "データの登録または更新中にエラーが発生しました" },
      { status: 500 }
    );
  }
}
