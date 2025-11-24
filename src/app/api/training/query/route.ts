import { db } from "@/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // リクエストボディからJSONをパースして必要なパラメータを取得
    const { startDate, endDate, userId } = await req.json();

    console.log("startDate:", startDate);

    if (!startDate || !endDate || !userId) {
      return NextResponse.json(
        { error: "必要なパラメータが不足しています" },
        { status: 400 }
      );
    }

    // Firestoreのクエリで、指定されたユーザーIDと
    // 指定された開始日～終了日（ここでは終了日を含む）でフィルタを実施
    const querySnapshot = await db
      .collection("training")
      .where("userId", "==", userId)
      .where("trainingDay", ">=", startDate)
      .where("trainingDay", "<=", endDate)
      .get();

    if (querySnapshot.empty) {
      return NextResponse.json({ error: "data not found" }, { status: 404 });
    }

    // クエリ結果から必要なデータを整形
    const trainings = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        userId: data.userId,
        trainingDay: data.trainingDay,
        exercises: data.exercises,
      };
    });

    return NextResponse.json({ trainings });
  } catch (error) {
    console.error("データの取得中にエラーが発生しました:", error);
    return NextResponse.json(
      { error: "データの取得中にエラーが発生しました" },
      { status: 500 }
    );
  }
}
