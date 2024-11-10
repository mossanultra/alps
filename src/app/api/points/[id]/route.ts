import { NextResponse } from "next/server";
import { markers } from "../data";

// Define the GET handler to accept params
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id; // Get the ID from the URL
    const point = markers.find((item) => item.id === id); // Find article by ID

    if (!point) {
      return NextResponse.json({ message: "point not found" }, { status: 404 });
    } else {
      return NextResponse.json(point);
    }
  } catch (error) {
    return NextResponse.json({ message: `${error}` }, { status: 500 });
  }
}
