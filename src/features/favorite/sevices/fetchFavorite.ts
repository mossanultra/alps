import { apiFetch } from "@/util/api";

export async function fetchFavorite(userId: string): Promise<Favorite[] | null> {
  if (!userId) {
    console.warn("User ID is not available.");
    return null;
  }

  try {
    const data = await apiFetch<Favorite[]>(`/api/favorite?userId=${userId}`);
    return data ?? null;
  } catch (error) {
    console.error("Error fetching favorite:", error);
    return null;
  }
}
