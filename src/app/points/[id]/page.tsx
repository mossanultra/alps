"use client";

import { notFound } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";
import ChatBubble from "./ChatBubble/ChatBubble";
import InputName from "./input-name/input-name";
import MessageBox from "./message-input/message-input";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import Button from "./send-button/send-button";
import { useChat } from "@/hooks/useChat";
import { useProfile } from "@/hooks/useProfile";
import { useAuthContext } from "@/app/context/AuthContext";
import { usePoint } from "@/hooks/usePoint";
import HamstarLoader from "@/app/components/loading/hamster/hamster";
import { Point } from "@/app/api/points/route";

interface PointPageProps {
  params: { id: string };
}

export default function PointPage({ params }: PointPageProps) {
  const { id } = params;
  const [sendUserName, setSendUserName] = useState("もずく");
  const virtuosoRef = useRef<VirtuosoHandle | null>(null);
  const { chats, loadingMore, fetchChats, fetchMoreChats, sendMessage } =
    useChat();
  const { profile, fetchProfile } = useProfile();
  const { fetchPoint } = usePoint();
  const { userId } = useAuthContext();
  const [point, setPoint] = useState<Point | null>(null);

  // Fetch user profile
  useEffect(() => {
    if (userId) fetchProfile(userId);
    console.log(sendUserName)
  }, [fetchProfile, sendUserName, userId]);

  // Handle scrolling to the top of the chat list
  const handleAtTop = useCallback(
    (atTop: boolean) => {
      if (atTop) fetchMoreChats();
    },
    [fetchMoreChats]
  );

  // Handle message submission
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

  // Fetch point data
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const p = await fetchPoint(id);
      setPoint(p);
    };

    fetchData();
  }, [fetchPoint, id]);

  // Fetch chats when point data is available
  useEffect(() => {
    if (!profile) return;

    if (point) fetchChats(null, point.lat, point.lng, profile.userId);
  }, [fetchChats, point, profile]);

  // Scroll to the last chat message on mount
  useEffect(() => {
    if (virtuosoRef.current) {
      setTimeout(() => {
        virtuosoRef.current?.scrollToIndex({ index: "LAST", behavior: "auto" });
      }, 0);
    }
  }, []);

  // Profile loading fallback
  const LoadProfile = () => <p>Profile Loading ...</p>;

  // Loading and error handling
  if (!point) return <HamstarLoader />;
  if (!profile) return <LoadProfile />;
  if (!point && !loadingMore) return notFound();

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <button
        onClick={() => window.history.back()}
        style={{ marginBottom: "10px" }}
      >
        戻る
      </button>
      <Virtuoso
        ref={virtuosoRef}
        style={{ flex: 1 }}
        data={chats}
        computeItemKey={(_, chat) => chat.id}
        itemContent={(_, chat) => (
          <ChatBubble
            key={chat.id}
            isselfchat={chat.userId === profile.userId}
            {...chat}
          />
        )}
        atTopStateChange={handleAtTop}
        initialTopMostItemIndex={chats.length - 1}
        components={{
          Footer: () => (loadingMore ? <div>読み込み中...</div> : null),
        }}
      />
      <div>
        <Button onClick={() => fetchChats(null, point.lat, point.lng, profile.userId)}>
          Refresh
        </Button>
      </div>
      <InputName
        onChange={setSendUserName}
        label="名前を入力"
        value={profile.userName}
      />
      <MessageBox onSendMessage={handleSubmit} />
    </div>
  );
}
