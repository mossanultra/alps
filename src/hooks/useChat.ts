import { useState, useCallback } from "react";
import { Chat } from "@/app/api/chat/route";

export function useChat() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [lastDocId, setLastDocId] = useState<string | null>(null);
  const [hasMoreChats, setHasMoreChats] = useState(true);

  /** チャットデータを取得 */
  const fetchChats = useCallback(
    async (pagingId: string | null = null) => {
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
    },
    []
  );

  /** さらにチャットを取得 */
  const fetchMoreChats = useCallback(() => {
    if (hasMoreChats && !loadingMore && lastDocId) {
      setLoadingMore(true);
      fetchChats(lastDocId);
    }
  }, [hasMoreChats, loadingMore, lastDocId, fetchChats]);

  /** メッセージ送信 */
  const sendMessage = useCallback(
    async (message: string, userName: string) => {
      if (!message || !userName) {
        alert("名前とメッセージを入力してください。");
        return;
      }
      try {
        const formData = new FormData();
        formData.append("text", message);
        formData.append("userName", userName);
        const response = await fetch("/api/chat", {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          alert("メッセージを送信しました！");
          await fetchChats(); // 新しいメッセージを取得
        } else {
          alert("送信に失敗しました。");
        }
      } catch (error) {
        console.error("Error sending message:", error);
        alert("エラーが発生しました。");
      }
    },
    [fetchChats]
  );

  return {
    chats,
    loadingMore,
    hasMoreChats,
    fetchChats,
    fetchMoreChats,
    sendMessage,
  };
}
