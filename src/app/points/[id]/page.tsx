"use client";

import { Point } from "@/app/api/points/route";
import { Chat } from "@/app/api/chat/route";
import HamstarLoader from "@/app/components/loading/hamster/hamster";
import { notFound } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";
import ChatBubble from "./ChatBubble/ChatBubble";
import InputName from "./input-name/input-name";
import MessageBox from "./message-input/message-input";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import Button from "./send-button/send-button";

interface PointPageProps {
  params: { id: string };
}

export default function PointPage({ params }: PointPageProps) {
  const { id } = params;
  const [point, setPoint] = useState<Point | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [sendUserName, setSendUserName] = useState("もずく");
  const [lastDocId, setLastDocId] = useState<string | null>(null);
  const [hasMoreChats, setHasMoreChats] = useState(true);
  const virtuosoRef = useRef<VirtuosoHandle | null>(null);

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

  /** チャットデータを取得 */
  const fetchChats = useCallback(async (pagingId: string | null = null) => {
    try {
      const path = pagingId ? `/api/chat?pagingId=${pagingId}` : `/api/chat`;
      const response = await fetch(path, { method: "GET" });
      if (response.ok) {
        const data: Chat[] = await response.json();

        if (pagingId) {
          setChats((prevChats) => [...data, ...prevChats]);
        } else {
          setChats([...data]);
        }
        setLastDocId(data[0]?.id || null);
        setHasMoreChats(data.length === 20); // 20件ずつ取得
      } else {
        console.error("Failed to fetch chats");
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
    } finally {
      setLoadingMore(false);
    }
  }, []);
  const handleAtTop = (atTop: boolean) => {
    if (atTop) {
      handleFetchMore();
    }
  };

  /** さらにチャットを取得 */
  const handleFetchMore = useCallback(() => {
    console.log("handleFetchMore", hasMoreChats, loadingMore, lastDocId);
    if (hasMoreChats && !loadingMore && lastDocId) {
      setLoadingMore(true);
      fetchChats(lastDocId);
    }
  }, [hasMoreChats, loadingMore, lastDocId, fetchChats]);

  /** メッセージ送信 */
  const handleSubmit = useCallback(
    async (message: string) => {
      if (!message || !sendUserName) {
        alert("名前とメッセージを入力してください。");
        return;
      }
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          body: JSON.stringify({ text: message, userName: sendUserName }),
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          alert("メッセージを送信しました！");
        } else {
          alert("送信に失敗しました。");
        }
      } catch (error) {
        console.error("Error sending message:", error);
        alert("エラーが発生しました。");
      }
    },
    [sendUserName]
  );

  /** 初回データ取得 */
  useEffect(() => {
    fetchPoints();
    fetchChats();
  }, [fetchChats, fetchPoints]);

  /** チャットデータ更新時に最下部へスクロール */
  useEffect(() => {
    const virtuoso = virtuosoRef.current;
    console.log("virtuoso:", virtuoso);
    console.log(chats);
    // if (virtuoso) {
    //   setTimeout(() => {
    //     console.log("scroll to index");
    //     virtuoso.scrollToIndex({ index: "LAST", behavior: "auto" });
    //   });
    // }
  }, [chats]);
  useEffect(() => {
    const virtuoso = virtuosoRef.current;
    if (virtuoso === null) {
      console.log("virtuoso is null");
      return;
    }

    if (virtuoso) {
      setTimeout(() => {
        console.log("scroll to index");
        virtuoso.scrollToIndex({ index: "LAST", behavior: "auto" });
      });
    }
  }, []);

  // ロード中の場合
  if (loading) return <HamstarLoader />;
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
        value={sendUserName}
      />
      <MessageBox onSendMessage={handleSubmit} />
    </div>
  );
}
