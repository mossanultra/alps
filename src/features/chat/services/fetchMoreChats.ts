import { apiFetch } from "@/util/api";
import { fetchChats } from "./fetchChats";

/** チャットデータを取得 */
export async function fetchMoreChats(
  lastDocId: string | null,
  lat: number,
  lng: number
) {
  if (!lastDocId) return { chats: [], lastDocId: null, hasMoreChats: false };
  return await fetchChats(lastDocId, lat, lng);
}
export async function updateLastReadAt(
  userId: string,
  lat: number,
  lng: number
): Promise<boolean> {
  if (!userId) {
    console.warn("userIdは必須です");
    return false;
  }

  try {
    const body = { userId, lat, lng };
    const result = await apiFetch<{ success: boolean }>(
      "/api/chat/lastReadAt",
      {
        method: "POST",
        body: JSON.stringify(body),
      }
    );

    return result?.success ?? false;
  } catch (error) {
    console.error("Error updating lastReadAt:", error);
    return false;
  }
}