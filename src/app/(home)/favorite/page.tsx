import styles from "./page.module.css";
import { fetchFavorite } from "@/features/favorite/sevices/fetchFavorite";
import { auth } from "../../../../auth";

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

export default async function Favorite() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }
  const favorite = await fetchFavorite(session.user.id);

  return (
    <div className={styles.container}>
      {/* <button className={styles.backButton} onClick={() => router.back()}>
        ← 戻る
      </button> */}
      <h1 className={styles.title}>お気に入りリスト</h1>
      <FavoriteListNode favorite={favorite!} />
    </div>
  );
}
