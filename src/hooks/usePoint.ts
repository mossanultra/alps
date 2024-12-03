import { useCallback, useState } from "react";

type Point = {
  id: string;
  lat: number;
  lng: number;
};

export function usePoint() {
  const [points, setPoints] = useState<Point[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  /** ポイントを登録 */
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
        alert("ポイントが登録されました！");
      } else {
        alert("送信に失敗しました。");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("エラーが発生しました。");
    }
  }, []);

  /** ポイントを取得 */
  const fetchPoints = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/points", { method: "GET" });
      if (response.ok) {
        const data: Point[] = await response.json();
        setPoints(data);
      } else {
        console.error("Failed to fetch");
      }
    } catch (error) {
      console.error("Error fetching:", error);
    }
    setLoading(false);
  }, []);

  return {
    registerPoint,
    fetchPoints,
    points,
    loading,
  };
}
