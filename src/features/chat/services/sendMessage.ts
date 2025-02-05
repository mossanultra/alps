import { apiFetch } from "@/util/api";

export async function sendMessage(
  message: string,
  userName: string,
  lat: number,
  lng: number,
  userId: string
): Promise<boolean> {
  if (!message || !userName) {
    console.warn("名前とメッセージは必須です");
    return false;
  }

  try {
    const body = { text: message, userName, lat, lng, userId };
    const result = await apiFetch<{ success: boolean }>("/api/chat", {
      method: "POST",
      body: JSON.stringify(body),
    });

    return result?.success ?? false;
  } catch (error) {
    console.error("Error sending message:", error);
    return false;
  }
}