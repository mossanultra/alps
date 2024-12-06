import { useCallback, useState } from "react";

export type Point = {
  lat: number;
  lng: number;
  id: string;
};

export function usePoint() {
  const [points, setPoints] = useState<Point[]>();

  /** ポイント登録 */
  const registerPoint = useCallback(async (lat: number, lng: number) => {
    if (!lat || !lng) {
      alert("緯度経度を入れてください。");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("lat", String(lat));
      formData.append("lng", String(lng));
      const response = await fetch("/api/points", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        console.log("Point registered successfully");
      } else {
        alert("送信に失敗しました。");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("エラーが発生しました。");
    }
  }, []);

  /** ポイント取得 */
  const fetchPoints = useCallback(async () => {
    try {
      const response = await fetch("/api/points", { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        setPoints(data);
      } else {
        console.error("Failed to fetch points");
      }
    } catch (error) {
      console.error("Error fetching points:", error);
    }
  }, []);

  return {
    registerPoint,
    fetchPoints,
    points,
  };
}
