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
    const formData = new FormData();
    formData.append("text", message);
    formData.append("userName", userName);
    formData.append("lat", String(lat));
    formData.append("lng", String(lng));
    formData.append("userId", userId);
    const result = await apiFetch<{ success: boolean }>("/api/chat", {
      method: "POST",
      body: formData,
    });

    return result?.success ?? false;
  } catch (error) {
    console.error("Error sending message:", error);
    return false;
  }
}
