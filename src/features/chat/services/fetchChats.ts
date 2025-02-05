import { apiFetch } from "@/util/api";
import { Chat } from "@/features/chat/types/chat";

/** チャットデータを取得 */
export async function fetchChats(
  pagingId: string | null = null,
  lat: number,
  lng: number
): Promise<{ chats: Chat[]; lastDocId: string | null; hasMoreChats: boolean }> {
  try {
    const path = pagingId
      ? `/api/chat?pagingId=${pagingId}&lat=${lat}&lng=${lng}`
      : `/api/chat?lat=${lat}&lng=${lng}`;

    const chats = await apiFetch<Chat[]>(path);

    return {
      chats: chats ?? [],
      lastDocId: chats?.[0]?.id ?? null,
      hasMoreChats: (chats?.length ?? 0) === 20, // 20件ずつ取得
    };
  } catch (error) {
    console.error("Error fetching chats:", error);
    return { chats: [], lastDocId: null, hasMoreChats: false };
  }
}