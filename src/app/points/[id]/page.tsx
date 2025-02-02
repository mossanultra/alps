"use client";

import { notFound } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";
import ChatBubble from "./ChatBubble/ChatBubble";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import { useChat } from "@/hooks/useChat";
import { useProfile } from "@/hooks/useProfile";
import { useAuthContext } from "@/app/context/AuthContext";
import { usePoint } from "@/hooks/usePoint";
import HamstarLoader from "@/app/components/loading/hamster/hamster";
import { Point } from "@/app/api/points/route";
import SendBox from "./SendBox/SendBox";

interface PointPageProps {
  params: { id: string };
}

export default function PointPage({ params }: PointPageProps) {
  const { id } = params;
  const virtuosoRef = useRef<VirtuosoHandle | null>(null);
  const { chats, loadingMore, fetchChats, fetchMoreChats, sendMessage } = useChat();
  const { profile, fetchProfile } = useProfile();
  const { fetchPoint } = usePoint();
  const { userId } = useAuthContext();
  const [point, setPoint] = useState<Point | null>(null);

  useEffect(() => {
    if (userId) fetchProfile(userId);
  }, [fetchProfile, userId]);

  const handleAtTop = useCallback(
    (atTop: boolean) => {
      if (atTop) fetchMoreChats();
    },
    [fetchMoreChats]
  );

  const handleSubmit = useCallback(
    async (message: string) => {
      if (!message) {
        alert("名前とメッセージを入力してください。");
        return;
      }
      if (profile && point) {
        sendMessage(message, profile.userName, point.lat, point.lng, profile.userId);
      }
    },
    [profile, point, sendMessage]
  );

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      const p = await fetchPoint(id);
      setPoint(p);
    };
    fetchData();
  }, [fetchPoint, id]);

  useEffect(() => {
    if (!profile) return;
    if (point) fetchChats(null, point.lat, point.lng, profile.userId);
  }, [fetchChats, point, profile]);

  useEffect(() => {
    if (virtuosoRef.current) {
      setTimeout(() => {
        virtuosoRef.current?.scrollToIndex({ index: "LAST", behavior: "auto" });
      }, 0);
    }
  }, []);

  async function registfavorite(pointId: string, userId: string) {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("pointId", pointId);
    const response = await fetch("/api/favorite", {
      method: "POST",
      body: formData,
    });
    return response;
  }

  const LoadProfile = () => <p>Profile Loading ...</p>;

  if (!point) return <HamstarLoader />;
  if (!profile) return <LoadProfile />;
  if (!point && !loadingMore) return notFound();

  return (
    <div>
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundImage: `url('/_3bceba53-bbe7-4266-88bf-99e370a54153.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <button onClick={() => window.history.back()} style={{ marginBottom: "10px" }}>
          戻る
        </button>
        <Virtuoso
          ref={virtuosoRef}
          style={{ flex: 1 }}
          data={chats}
          computeItemKey={(_, chat) => chat.id}
          itemContent={(_, chat) => (
            <ChatBubble key={chat.id} isselfchat={chat.userId === profile.userId} {...chat} />
          )}
          atTopStateChange={handleAtTop}
          initialTopMostItemIndex={chats.length - 1}
          components={{
            Footer: () => (loadingMore ? <div>読み込み中...</div> : null),
          }}
        />
      </div>
      <SendBox
          onSend={handleSubmit}
          onRefresh={() => fetchChats(null, point.lat, point.lng, profile.userId)}
          onFavorite={() => registfavorite(id, userId!)}
        />
    </div>
  );
}
