import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../firebaseAdmin";
import { XMLParser } from "fast-xml-parser";

export interface favorite {
  userId: string;
  pointId: string;
  lat: number;
  lng: number;
  cityName: string;
}

// 登録されているチャットメッセージのリストを取得（作成順）
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const query = db.collection("favorite").where("userId", "==", userId);

    const querySnapshot = await query.get();
    const favoriteList = await Promise.all(
      querySnapshot.docs.map(async (f) => {
        const data = f.data();
        const pointId = data.pointId;
        const userId = data.userId;
        const latlng = await db.collection("points").doc(pointId).get();
        let lat = 0,
          lng = 0;

        if (!latlng.data()) {
        } else {
          lat = latlng.data()!.lat;
          lng = latlng.data()!.lng;
        }
        function decodeNumericCharacterReference(str: string) {
          return str.replace(/&#(\d+);/g, (match, code) => {
            return String.fromCharCode(parseInt(code, 10));
          });
        }

        const url = `https://geoapi.heartrails.com/api/xml?method=searchByGeoLocation&x=${lng}&y=${lat}`;
        const geoLocationResponse = await fetch(url);
        const responseTxt = await geoLocationResponse.text();
        const decodedString = decodeNumericCharacterReference(responseTxt);
        const parser = new XMLParser();
        const jsonObj = parser.parse(decodedString);
        const response = jsonObj.response.location[0];

        // https://geoapi.heartrails.com/api/xml?method=searchByGeoLocation&x=135.0&y=35.0
        const cityName = `${response.prefecture} ${response.city} ${response.town}`;
        const responseValue = {
          pointId,
          userId,
          lat,
          lng,
          cityName,
        };
        return responseValue;
      })
    );
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
      return NextResponse.json(
        { error: "テキストが必要です" },
        { status: 400 }
      );
    }

    if (!userId || typeof userId !== "string") {
      return NextResponse.json(
        { error: "userNameが必要です" },
        { status: 400 }
      );
    }
    const favorite = { userId, pointId };

    const query = db
      .collection("favorite")
      .where("userId", "==", userId)
      .where("pointId", "==", pointId);

    const querySnapshot = await query.get();

    if (querySnapshot.docs.length > 0) {
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
