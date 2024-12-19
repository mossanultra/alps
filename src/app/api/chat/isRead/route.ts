import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebaseAdmin";

// 未読判定
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const lng = searchParams.get("lng");
    const lat = searchParams.get("lat");

    if (!userId || typeof userId !== "string") {
      return NextResponse.json(
        { error: "テキストが必要です" },
        { status: 400 }
      );
    }

    const lastCreatedAt = await getLastCreatedAt(Number(lat), Number(lng));
    if (!lastCreatedAt) {
      // 1件もメッセージがない時は既読
      return NextResponse.json(true);
    }

    const lastReadAt = await getLastReadAt(userId, Number(lat), Number(lng));
    if (!lastReadAt) {
      // 既読時間が存在しない場合は未読
      return NextResponse.json(false);
    }

    return NextResponse.json(lastCreatedAt < lastReadAt);
  } catch (error) {
    console.error("データの取得中にエラーが発生しました:", error);
    return NextResponse.json(
      { error: "データの取得中にエラーが発生しました" },
      { status: 500 }
    );
  }
}
async function getLastCreatedAt(lat: number, lng: number) {
  const querySnapshot = await db
    .collection("chats")
    .where("lat", "==", Number(lat))
    .where("lng", "==", Number(lng))
    .orderBy("createdAt", "desc")
    .limit(1)
    .get();
  if (querySnapshot.empty) {
    return null;
  }
  const lastRecord = querySnapshot.docs[0].data();
  return lastRecord.createdAt;
}

async function getLastReadAt(userId: string, lat: number, lng: number) {
  const querySnapshot = await db
    .collection("lastReadAt")
    .where("userId", "==", userId)
    .where("lat", "==", Number(lat))
    .where("lng", "==", Number(lng))
    .get();
  if (querySnapshot.empty) {
    return null;
  }
  const lastReadAt = querySnapshot.docs[0].data();
  return lastReadAt.lastReadAt;
}
