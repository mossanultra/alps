"use client";

import { useFavorite } from "@/hooks/useFavorite";
import { useAuthContext } from "../context/AuthContext";
import { useEffect } from "react";

interface favoriteListProps {
  favorite: Favorite[];
}
function FavoriteListNode(props: favoriteListProps) {
  if (!props.favorite) {
    return;
  }
  return (
    <>
      {props.favorite.map((e, index) => {
        const linkUrl = `/points/${e.pointId}`;
        return (
          <div key={index}>
            <a  href={linkUrl}>
              {e.cityName}
            </a>
          </div>
        );
      })}
    </>
  );
}

export default function Favorite() {
  const { favorite, fetchFavorite } = useFavorite();
  const { userId } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      await fetchFavorite(userId!);
    };
    fetchData();
  }, [fetchFavorite, userId]);

  return (
    <div>
      <FavoriteListNode favorite={favorite!}></FavoriteListNode>
    </div>
  );
}
