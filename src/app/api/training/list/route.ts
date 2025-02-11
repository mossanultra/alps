import { db } from "@/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

  export async function GET(req: NextRequest) {
    try {
      const { searchParams } = new URL(req.url);
      const userId = searchParams.get("userId");
      const year = searchParams.get("year"); 
      const month = searchParams.get("month");

      const startDate = `${year}/${month}/01`; // 2025/02/01
      const endDate = `${year}/${month}/32`;   // 2025/02/32 → 32にすることで2月末までカバー

      console.log(startDate);
      console.log(endDate);
      console.log(userId);
      
      const querySnapshot = await db
      .collection("training")
      .where("userId", "==", userId)
      .where("trainingDay", ">=", startDate)
      .where("trainingDay", "<", endDate)
      .get();

      if(querySnapshot.empty){
        return NextResponse.json({ error: "data not found" }, { status: 404 });
      }
      
      const trainings = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          userId: data.userId,
          trainingDay: data.trainingDay,
          exercises: data.exercises,
        };
      });
  
      return NextResponse.json({
        trainings
      });
    } catch (error) {
      console.error("データの取得中にエラーが発生しました:", error);
      return NextResponse.json(
        { error: "データの取得中にエラーが発生しました" },
        { status: 500 }
      );
    }
  }
  