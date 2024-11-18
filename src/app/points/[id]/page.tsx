"use client";

import { Point } from "@/app/api/points/route";
import { Chat } from "@/app/api/chat/route";
import HamstarLoader from "@/app/components/loading/hamster/hamster";
import { notFound } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";

import ChatBubble from "./ChatBubble/ChatBubble";
import InputName from "./input-name/input-name";
import React from "react";
import MessageBox from "./message-input/message-input";
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
  const [hasFetchedChats, setHasFetchedChats] = useState(false); // チャット取得済みフラグ

  const chatListRef = useRef<HTMLDivElement | null>(null);
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);
  const observerTarget = useRef<HTMLDivElement | null>(null); // IntersectionObserverのターゲット

  const fetchPoints = useCallback(async () => {
    try {
      const path = `/api/points/${id}`;
      const response = await fetch(path, { method: "GET" });
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

  const fetchChats = useCallback(
    async (pagingId: string | null = null) => {
      try {
        console.log("fetchChats-" + pagingId);
        const path = pagingId ? `/api/chat?pagingId=${pagingId}` : `/api/chat`;
        const response = await fetch(path, { method: "GET" });
        if (response.ok) {
          const data: Chat[] = await response.json();

          setHasFetchedChats(false); // チャットが取得されたことを記録
          if (pagingId) {
            setChats((prevChats) => [...data, ...prevChats]);
          } else {
            setChats([...data]);
          }

          if (data.length > 0) {
            setLastDocId(data[0].id);
          }
          setHasMoreChats(data.length === 20);
          console.log("data===20", data.length === 20);
          console.log("data[0].id", data[0].id);
        } else {
          console.error("Failed to fetch chats");
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
      } finally {
        if (pagingId) {
          setLoadingMore(false);
        }
      }
    },
    [setChats, setHasFetchedChats, setLastDocId, setHasMoreChats]
  );

  const handleSubmit = useCallback(
    async (message: string) => {
      if (!message || !sendUserName) {
        alert("Please select an image and write some text.");
        return;
      }

      const formData = new FormData();
      formData.append("text", message);
      formData.append("userName", sendUserName);
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          alert("Post created successfully!");
        } else {
          alert("Failed to create post");
        }
      } catch (error) {
        console.error("Error creating post:", error);
        alert("An error occurred while creating the post");
      }
    },
    [sendUserName]
  );
  const handleFetchMore = useCallback(() => {
    if (hasMoreChats && !loadingMore && lastDocId) {
      setLoadingMore(true);
      fetchChats(lastDocId);
    }
  }, [hasMoreChats, loadingMore, lastDocId, fetchChats]);

  useEffect(() => {
    console.log("hasFetchedChats:", hasFetchedChats);
    // if (!hasFetchedChats) return; // 初回は無視

    // setHasFetchedChats(false); // チャットが取得されたことを記録

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          handleFetchMore();
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [handleFetchMore, hasFetchedChats]);

  useEffect(() => {
    fetchPoints();
    fetchChats();
  }, [fetchChats, fetchPoints]);

  useEffect(() => {
    if (chats.length > 0 && endOfMessagesRef.current) {
      // 初回レンダリングのみ「スムーズスクロール」をオフにする
      const behavior = loadingMore ? "smooth" : "auto";
      endOfMessagesRef.current.scrollIntoView({ behavior });
      setHasFetchedChats(true); // チャットが取得されたことを記録
    }
  }, [chats, loadingMore]);

  if (!loading && !point && !loadingMore) {
    notFound();
  }

  if (loading) {
    return <HamstarLoader />;
  }

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <button
        onClick={() => window.history.back()}
        style={{ marginBottom: "10px" }}
      >
        戻る
      </button>

      {/* チャットリストのスクロールコンテナ */}
      <div
        ref={chatListRef}
        style={{
          flex: 1,
          overflowY: "scroll",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {chats.map((chat, index) => (
          <React.Fragment key={chat.id}>
            {index === 0 && !hasFetchedChats && (
              <div ref={observerTarget} style={{ height: "1px" }} />
            )}
            <ChatBubble isselfchat={chat.userName === sendUserName} {...chat} />
          </React.Fragment>
        ))}
        <div ref={endOfMessagesRef} /> {/* 最下部スクロール用 */}
      </div>
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
        onChange={(e) => setSendUserName(e)}
        label={"Input username"}
        value={sendUserName}
      />
      <MessageBox
        onSendMessage={function (message: string): void {
          // setSendText();
          handleSubmit(message);
        }}
      ></MessageBox>
    </div>
  );
}
