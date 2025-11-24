import { apiFetch } from "@/util/api";


export async function getUnread(
  userId: string,
  lat: number,
  lng: number
): Promise<boolean> {
  if (!userId) {
    console.warn("userIdは必須です");
    return false;
  }

  try {
    const path = `/api/chat/isRead?userId=${userId}&lat=${lat}&lng=${lng}`;
    const result = await apiFetch<boolean>(path);

    return result ?? false;
  } catch (error) {
    console.error("Error checking unread status:", error);
    return false;
  }
}
