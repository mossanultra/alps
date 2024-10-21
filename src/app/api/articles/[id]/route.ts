// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse } from "next/server";
import { Articles } from "../articles";

export async function GET() {
  try {
    const article = Articles[0];

    if (!article) {
      return NextResponse.json({ message: "Article not found" }, { status: 404 });
    } else {
      return NextResponse.json(article);
    }
  } catch (error) {
    return NextResponse.json({ message:`${error}`  }, { status: 500 });
  }
}
