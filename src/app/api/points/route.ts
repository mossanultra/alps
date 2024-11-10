import { NextResponse } from "next/server";
import { markers } from "./data";

export interface Point {
  lat: number;
  lng: number;
  id: string;
}

// 登録されている座標のリスト
export async function GET() {
  try {
    const points: Point[] = markers.map(m => {
      return({lat: m.lat,lng: m.lng, id: m.id})
    })

    return NextResponse.json(points);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
