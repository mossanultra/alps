import { db } from "@/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";
import { ExerciseGroup } from "../ocr/types/ocr";

async function saveFirestore(userId: string, date: string, exercises: ExerciseGroup[]) {
    // Firestore への保存処理を記述
    const record = {
        userId: userId,
      trainingDay: date,
      exercises: exercises,
      createdAt: new Date(),
    };
    const response = await db.collection("training").add(record);
    return response.id;
  
  }
  export async function GET(req: NextRequest) {
    try {
      const { searchParams } = new URL(req.url);
      const trainingId = searchParams.get("trainingId"); // クエリパラメータからIDを取得

      if (!trainingId) {
        return NextResponse.json({ error: "Bad Request" }, { status: 400 });
      }
  
      // コレクションから userId でフィルタリング
        const docRef = await db.collection("training").doc(trainingId).get();

      // データが存在しない場合の処理
      if (!docRef.exists) {
        return NextResponse.json({ error: "training not found" }, { status: 404 });
      }
  
      // 取得したデータを処理
      const doc = docRef.data()!;
  
      return NextResponse.json({
        userId: doc.userId,
        tarainingDay: doc.tarainingDay,
        exercises: doc.exercises,
      });
    } catch (error) {
      console.error("データの取得中にエラーが発生しました:", error);
      return NextResponse.json(
        { error: "データの取得中にエラーが発生しました" },
        { status: 500 }
      );
    }
  }
  
  // --- Next.js API ハンドラー ---
  export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const image = formData.get("image");
    const userId = formData.get("userId") as string;
    const trainingDay = formData.get("trainingDay") as string;
    const exercises = JSON.parse(formData.get("exercises") as string) as ExerciseGroup[] | null;
    if (!image) {
      return NextResponse.json({ message: "No image file provided" },
        { status: 400 });
    }
    if (!exercises) {
      return NextResponse.json({ message: "No exercises provided" }, { status: 400 });
    }
    const id = await saveFirestore(userId, trainingDay, exercises);

    return NextResponse.json(
        { id: id},
        { status: 201 });
    }
  
  