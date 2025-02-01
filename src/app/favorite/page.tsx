"use client";

import { useFavorite } from "@/hooks/useFavorite";
import { useAuthContext } from "../context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

interface Favorite {
  pointId: string;
  cityName: string;
}

interface FavoriteListProps {
  favorite: Favorite[];
}

function FavoriteListNode({ favorite }: FavoriteListProps) {
  if (!favorite) return null;

  return (
    <div className={styles.listContainer}>
      {favorite.map((e, index) => {
        const linkUrl = `/points/${e.pointId}`;
        return (
          <div key={index} className={styles.card}>
            <a href={linkUrl} className={styles.link}>
              {e.cityName}
            </a>
          </div>
        );
      })}
    </div>
  );
}

export default function Favorite() {
  const { favorite, fetchFavorite } = useFavorite();
  const { userId } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      await fetchFavorite(userId!);
    };
    fetchData();
  }, [fetchFavorite, userId]);

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => router.back()}>
        ← 戻る
      </button>
      <h1 className={styles.title}>お気に入りリスト</h1>
      <FavoriteListNode favorite={favorite!} />
    </div>
  );
}
