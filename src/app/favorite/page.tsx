"use client";

import { useFavorite } from "@/hooks/useFavorite";
import { useAuthContext } from "../context/AuthContext";
import { useEffect } from "react";
import HamstarLoader from "../components/loading/hamster/hamster";

interface favoriteListProps {
    favorite: Favorite[];
}
function FavoriteListNode(props: favoriteListProps) {
    return (
        <>
            {props.favorite.map(e => {
                const linkUrl = `/points/${e.pointId}`;
                return (
                    <a href={linkUrl}>{e.pointId}</a>
                )
            })}
        </>
    )
}

export default function Favorite() {
    const { loading, favorite, fetchFavorite } = useFavorite();
    const { userId } = useAuthContext();

    useEffect(() => {
        const fetchData = async () => {
            await fetchFavorite(userId!);
        };
        fetchData();
    }, []);

    if (loading) {
        return <HamstarLoader></HamstarLoader>
    }

    return
    (<div>
        <FavoriteListNode favorite={favorite!}></FavoriteListNode>
    </div>)
}