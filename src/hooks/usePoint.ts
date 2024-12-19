import { Point } from "@/app/api/points/route";
import { useCallback, useState } from "react";

export function usePoint() {
  const [points, setPoints] = useState<Point[]>();
  const [point, setPoint] = useState<Point | null>(null);

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
  const fetchPoints = useCallback(async (userId? : string) => {
    try {
      const path = userId ? `/api/points?userId=${userId}` : `/api/points`;
      const response = await fetch(path, { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        setPoints(data);
        console.log(data)
      } else {
        console.error("Failed to fetch points");
      }
    } catch (error) {
      console.error("Error fetching points:", error);
    }
  }, []);
  const fetchPoint = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/points/${id}`, { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        setPoint(data);
        return data;
      } else {
        console.error("Failed to fetch points");
        return null;
      }
    } catch (error) {
      console.error("Error fetching points:", error);
      return null;
    } finally {
    }
  }, []);

  return {
    registerPoint,
    fetchPoints,
    fetchPoint,
    point,
    points,
  };
}
