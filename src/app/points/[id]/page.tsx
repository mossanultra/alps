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
import { Point, usePoint } from "@/hooks/usePoint";
import HamstarLoader from "@/app/components/loading/hamster/hamster";

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

  useEffect(() => {
    if (userId) {
      fetchProfile(userId);
    }
  }, [fetchProfile, userId]);

  const handleAtTop = (atTop: boolean) => {
    if (atTop) {
      fetchMoreChats();
    }
  };

  /** メッセージ送信 */
  const handleSubmit = useCallback(
    async (message: string) => {
      if (!message) {
        alert("名前とメッセージを入力してください。");
        return;
      }
      sendMessage(message, profile!.userName, point!.lat, point!.lng);
    },
    [point, profile, sendMessage]
  );
  /** 初回データ取得 */
  useEffect(() => {
    if (!id) {
      return;
    }
    const fetchData = async () => {
      const p = await fetchPoint(id);
      setPoint(p);
    };
    fetchData();
  }, [fetchPoint, id]);
  useEffect(() => {
    if (point) {
      fetchChats(null, point!.lat, point!.lng);
    }
  }, [fetchChats, point]);

  useEffect(() => {
    const virtuoso = virtuosoRef.current;
    if (virtuoso === null) {
      return;
    }

    if (virtuoso) {
      setTimeout(() => {
        virtuoso.scrollToIndex({ index: "LAST", behavior: "auto" });
      });
    }
  }, []);

  function LoadProfile() {
    return <p>Profile Loading ...</p>;
  }

  // ロード中の場合
  if (!point) return <HamstarLoader />;
  if (!profile) return LoadProfile();
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
        // key={virtuosoKey} // リセット用の key
        ref={virtuosoRef}
        style={{ flex: 1 }}
        data={chats}
        computeItemKey={(_, chat) => chat.id}
        itemContent={(_, chat) => (
          <ChatBubble
            key={chat.id}
            isselfchat={chat.userName === sendUserName}
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
        <Button
          onClick={() => {
            fetchChats(null, point!.lat, point!.lng);
          }}
        >
          {"Refresh"}
        </Button>
      </div>
      <InputName
        onChange={setSendUserName}
        label="名前を入力"
        value={profile!.userName}
      />
      <MessageBox onSendMessage={handleSubmit} />
    </div>
  );
}
