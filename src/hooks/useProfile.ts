import { Profile } from "@/app/types/profile";
import { useState, useCallback } from "react";

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);

  /** プロフィールデータを取得 */
  const fetchProfile = useCallback(
    async (userId: string): Promise<Profile | null> => {
      if (!userId) {
        console.warn("User ID is not available.");
        return null;
      }

      try {
        const response = await fetch(`/api/profile?userId=${userId}`, {
          method: "GET",
        });

        if (!response.ok) {
          console.error(
            `Failed to fetch profile: ${response.status} ${response.statusText}`
          );
          return null;
        }

        const data: Profile = await response.json();
        setProfile(data);
        return data;
      } catch (error) {
        console.error("Error fetching profile:", error);
        return null;
      }
    },
    []
  );

  return { profile, fetchProfile };
}
