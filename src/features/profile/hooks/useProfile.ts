import { apiFetch } from "@/util/api";
import { Profile } from "../types/profile";

export async function fetchProfile(userId: string): Promise<Profile | null> {
  if (!userId) {
    console.warn("User ID is not available.");
    return null;
  }

  return apiFetch<Profile>(`/api/profile?userId=${userId}`);
}
