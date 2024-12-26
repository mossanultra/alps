import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../firebaseAdmin";

export interface Profile {
  userName: string;
  userIcon: string;
  userId: string;
  id: string;
}

// 登録されているチャットメッセージのリストを取得（作成順）
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId"); // クエリパラメータからIDを取得

    if (!userId) {
      return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    // コレクションから userId でフィルタリング
    const querySnapshot = await db
      .collection("profile")
      .where("userId", "==", userId)
      .get();

    // データが存在しない場合の処理
    if (querySnapshot.empty) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    // 取得したデータを処理
    const profileDoc = querySnapshot.docs[0].data();

    return NextResponse.json({
      userName: profileDoc.userName,
      userIcon: profileDoc.userIcon,
      userId: profileDoc.userId,
    });
  } catch (error) {
    console.error("データの取得中にエラーが発生しました:", error);
    return NextResponse.json(
      { error: "データの取得中にエラーが発生しました" },
      { status: 500 }
    );
  }
}
