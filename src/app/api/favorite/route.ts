import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../firebaseAdmin";

export interface favorite {
  userId: string;
  pointId: string;
}

// 登録されているチャットメッセージのリストを取得（作成順）
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");


    let query = db
      .collection("favorite")
      .where("userId", "==", userId)

    const querySnapshot = await query.get();
    const favoriteList = querySnapshot.docs.map(f => {
      const data = f.data();
      const pointId = data.pointId;
      const userId = data.userId;
      return {
        pointId , userId
      }
    });

    return NextResponse.json(favoriteList);
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
    const pointId = formData.get("pointId");
    const userId = formData.get("userId");

    if (!pointId || typeof pointId !== "string") {
      return NextResponse.json({ error: "テキストが必要です" }, { status: 400 });
    }

    if (!userId || typeof userId !== "string") {
      return NextResponse.json({ error: "userNameが必要です" }, { status: 400 });
    }
    const favorite = { userId, pointId };

    let query = db.collection("favorite")
    .where("userId", "==", userId)
    .where("pointId", "==", pointId);
    
    const querySnapshot = await query.get();

    if(querySnapshot.docs.length > 0){
      return NextResponse.json({ message: "投稿が正常に保存されました" });
    }
    // Firestoreに投稿データを保存
    await db.collection("favorite").add(favorite);

    return NextResponse.json({ message: "投稿が正常に保存されました" });
  } catch (error) {
    console.error("投稿のアップロード中にエラーが発生しました:", error);
    return NextResponse.json(
      { error: "投稿のアップロード中にエラーが発生しました" },
      { status: 500 }
    );
  }
}