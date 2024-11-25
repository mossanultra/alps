import { useState, useCallback } from "react";
import { Profile } from "@/app/api/profile/route";
import { useAuthContext } from "@/app/context/AuthContext";

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const { userId } = useAuthContext();

  /** チャットデータを取得 */
  const fetchProfile = useCallback(async () => {
    try {
      console.log(userId);
      const path = `/api/profile?userId=${userId}`;
      const response = await fetch(path, { method: "GET" });
      if (response.ok) {
        const data: Profile = await response.json();

        setProfile(data);
      } else {
        console.error("Failed to fetch chats");
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
    } finally {
    }
  }, [userId]);

  return {
    profile,
    fetchProfile,
  };
}
