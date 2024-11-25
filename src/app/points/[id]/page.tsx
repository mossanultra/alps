"use client";

import { Point } from "@/app/api/points/route";
import HamstarLoader from "@/app/components/loading/hamster/hamster";
import { notFound, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";
import ChatBubble from "./ChatBubble/ChatBubble";
import InputName from "./input-name/input-name";
import MessageBox from "./message-input/message-input";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import Button from "./send-button/send-button";
import { useChat } from "@/hooks/useChat";
import { useProfile } from "@/hooks/useProfile";

interface PointPageProps {
  params: { id: string };
}

export default function PointPage({ params }: PointPageProps) {
  const { id } = params;
  const [point, setPoint] = useState<Point | null>(null);
  const [loading, setLoading] = useState(true);
  const [sendUserName, setSendUserName] = useState("もずく");
  const virtuosoRef = useRef<VirtuosoHandle | null>(null);
  const { chats, loadingMore, fetchChats, fetchMoreChats, sendMessage } =
    useChat();
  const { profile, fetchProfile } = useProfile();

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchProfile(); // 復帰時にプロフィールを再取得
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [fetchProfile]);

  /** ポイントデータを取得 */
  const fetchPoints = useCallback(async () => {
    try {
      const response = await fetch(`/api/points/${id}`, { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        setPoint(data);
      } else {
        console.error("Failed to fetch points");
      }
    } catch (error) {
      console.error("Error fetching points:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

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
      sendMessage(message, profile!.userName);
    },
    [profile, sendMessage]
  );
  /** 初回データ取得 */
  useEffect(() => {
    fetchPoints();
    fetchChats();
  }, [fetchChats, fetchPoints]);

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
  if (loading) return <HamstarLoader />;
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
            fetchChats();
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
