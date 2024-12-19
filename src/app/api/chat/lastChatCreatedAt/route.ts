import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebaseAdmin";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lng = searchParams.get("lng"); // クエリパラメータからIDを取得
    const lat = searchParams.get("lat"); // クエリパラメータからIDを取得

    console.log("lat", Number(lat));
    console.log("lng", Number(lng));
    const querySnapshot = await db
      .collection("chats")
      .where("lat", "==", Number(lat))
      .where("lng", "==", Number(lng))
      .orderBy("createdAt", "desc")
      .limit(1)
      .get();
    if (querySnapshot.empty) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }

    const lastRecord = querySnapshot.docs[0].data();

    return NextResponse.json(lastRecord.createdAt);
  } catch (error) {
    console.error("データの取得中にエラーが発生しました:", error);
    return NextResponse.json(
      { error: "データの取得中にエラーが発生しました" },
      { status: 500 }
    );
  }
}
