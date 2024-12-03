import { useState, useCallback } from "react";
import { Profile } from "@/app/api/profile/route";
import { useAuthContext } from "@/app/context/AuthContext";

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const { userId } = useAuthContext();

  /** APIリクエスト関数 */
  const fetchProfileData = async (userId: string): Promise<Profile> => {
    const response = await fetch(`/api/profile?userId=${userId}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch profile data");
    }
    return response.json();
  };

  /** プロフィールを取得 */
  const fetchProfile = useCallback(async () => {
    if (!userId) {
      console.error("User ID is not available");
      return;
    }

    try {
      const data = await fetchProfileData(userId);
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }, [userId]);

  return {
    profile,
    fetchProfile,
  };
}
