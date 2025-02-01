import { useCallback, useState } from "react";

export function useFavorite() {
  const [favorite, setFavorite] = useState<Favorite[]>();
  const [loading, setLoading] = useState(true);

  /** ポイント登録 */
  const fetchFavorite = useCallback(async (userId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/favorite?userId=${userId}`, {
        method: "GET",
      });
      if (response.ok) {
        const body: Favorite[] = await response.json();
        setFavorite(body);
        setLoading(false);
      } else {
        alert("送信に失敗しました。");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("エラーが発生しました。");
    }
  }, []);

  return {
    fetchFavorite,
    favorite,
    loading,
  };
}
