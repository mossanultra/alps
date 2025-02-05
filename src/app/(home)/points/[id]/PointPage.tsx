"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import ChatBubble from "../../../../features/chat/components/ChatBubble/ChatBubble";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import { Point } from "@/features/point/types/point";
import SendBox from "../../../../features/chat/components/SendBox/SendBox";
import { Profile } from "@/features/profile/types/profile";
import { fetchChats } from "@/features/chat/services/fetchChats";
import { Chat } from "@/features/chat/types/chat";
import { sendMessage } from "@/features/chat/services/sendMessage";

interface PointPageProps {
  id: string;
  userProfile: Profile;
  pointData: Point;
}

export default function PointPage({
  id,
  userProfile,
  pointData,
}: PointPageProps) {
  const virtuosoRef = useRef<VirtuosoHandle | null>(null);
  const [chats, setChats] = useState<{
    chats: Chat[];
    lastDocId: string | null;
    hasMoreChats: boolean;
  } | null>(null);

  // チャットデータの取得
  const loadChats = useCallback(async () => {
    const chatData = await fetchChats(null, pointData.lat, pointData.lng);
    setChats(chatData);
  }, [pointData]);

  useEffect(() => {
    loadChats();
  }, [loadChats]);

  // 追加のチャットデータを取得
  const fetchMoreChats = useCallback(async () => {
    if (chats?.hasMoreChats && chats.lastDocId) {
      const moreChats = await fetchChats(
        chats.lastDocId,
        pointData.lat,
        pointData.lng
      );
      setChats((prevChats) => ({
        chats: [...moreChats.chats, ...(prevChats?.chats || [])], // 上に追加
        lastDocId: moreChats.lastDocId,
        hasMoreChats: moreChats.hasMoreChats,
      }));
    }
  }, [chats, pointData]);

  // 自動スクロール（初回のみ）
  useEffect(() => {
    if (virtuosoRef.current) {
      setTimeout(() => {
        virtuosoRef.current?.scrollToIndex({ index: "LAST", behavior: "auto" });
      }, 0);
    }
  }, [chats]);

  const registFavorite = useCallback(
    async (pointId: string, userId: string) => {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("pointId", pointId);
      await fetch("/api/favorite", { method: "POST", body: formData });
    },
    []
  );

  if (!chats) return null;

  return (
    <div>
      <button
        onClick={() => window.history.back()}
        style={{ marginBottom: "10px" }}
      >
        戻る
      </button>
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
        <Virtuoso
          ref={virtuosoRef}
          style={{ flex: 1 }}
          data={chats.chats}
          computeItemKey={(_, chat) => chat.id}
          itemContent={(_, chat) => (
            <ChatBubble
              key={chat.id}
              isselfchat={chat.userId === userProfile.userId}
              {...chat}
            />
          )}
          atTopStateChange={(atTop) => atTop && fetchMoreChats()}
          initialTopMostItemIndex={Math.max(0, chats.chats.length - 1)}
          components={{
            Footer: () => <div />, // または undefined にする
          }}
        />
      </div>
      <SendBox
        onSend={async (message) => {
          if (!message) {
            alert("メッセージを入力してください。");
            return;
          }
          await sendMessage(
            message,
            userProfile.userName,
            pointData.lat,
            pointData.lng,
            userProfile.userId
          );
        }}
        onRefresh={loadChats}
        onFavorite={() => registFavorite(id, userProfile.userId)}
      />
    </div>
  );
}
