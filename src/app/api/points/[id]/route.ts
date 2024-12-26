import { NextResponse } from "next/server";
import { db } from "@/firebaseAdmin";
import { Point } from "../route";

// Define the GET handler to accept params
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
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
    const id = params.id; // Get the ID from the URL
    const point = points.find((item) => item.id === id); // Find article by ID

    if (!point) {
      return NextResponse.json({ message: "point not found" }, { status: 404 });
    } else {
      return NextResponse.json(point);
    }
  } catch (error) {
    return NextResponse.json({ message: `${error}` }, { status: 500 });
  }
}
