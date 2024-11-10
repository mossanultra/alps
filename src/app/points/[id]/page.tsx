"use client";

import { Point } from "@/app/api/points/route";
import HamstarLoader from "@/app/components/loading/hamster/hamster";
import { notFound } from "next/navigation";
import { useState, useEffect } from "react";

interface PointPageProps {
  params: { id: string };
}

export default function PointPage({ params }: PointPageProps) {
  const { id } = params;
  const [point, setPoint] = useState<Point | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPoints = async () => {
    try {
      const path = `/api/points/${id}`;
      console.log("path=", path);
      const response = await fetch(path, { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        setPoint(data);
      } else {
        console.error("Failed to fetch");
      }
    } catch (error) {
      console.error("Error fetching:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPoints();
  }, []);

  // データが取得できずに404の状態のとき
  if (!loading && !point) {
    notFound();
  }

  // ローディング中の表示
  if (loading) {
    return <HamstarLoader/>
  }

  return (
    <div>
      <h1>まほさんが色々頑張って作るページ。コメントスレッドとか？</h1>
      <p>{point?.id}</p>
    </div>
  );
}
