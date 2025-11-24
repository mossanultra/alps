import { apiFetch } from "@/util/api";
import { Point } from "@/features/point/types/point";

/** ポイント登録 */
export async function registerPoint(
  lat: number,
  lng: number
): Promise<boolean> {
  if (!lat || !lng) {
    console.warn("緯度経度を入れてください。");
    return false;
  }

  try {
    const formData = new FormData();
    formData.append("lat", String(lat));
    formData.append("lng", String(lng));
    const result = await apiFetch<{ success: boolean }>("/api/points", {
      method: "POST",
      body: formData,
    });

    return result?.success ?? false;
  } catch (error) {
    console.error("Error registering point:", error);
    return false;
  }
}

/** ポイント一覧取得 */
export async function fetchPoints(userId?: string): Promise<Point[]> {
  try {
    const path = userId ? `/api/points?userId=${userId}` : "/api/points";
    return (await apiFetch<Point[]>(path)) ?? [];
  } catch (error) {
    console.error("Error fetching points:", error);
    return [];
  }
}

/** 指定ポイント取得 */
export async function fetchPoint(id: string): Promise<Point | null> {
  try {
    return await apiFetch<Point>(`/api/points/${id}`);
  } catch (error) {
    console.error("Error fetching point:", error);
    return null;
  }
}
