"use client";

import { Point } from "@/app/api/points/route";
import { Chat } from "@/app/api/chat/route";
import HamstarLoader from "@/app/components/loading/hamster/hamster";
import { notFound } from "next/navigation";
import { useState, useEffect } from "react";

import ChatBubble from "./ChatBubble/ChatBubble";

interface PointPageProps {
  params: { id: string };
}

export default function PointPage({ params }: PointPageProps) {
  const { id } = params;
  const [point, setPoint] = useState<Point | null>(null);
  const [chats, setchats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingChat, setLoadingChat] = useState(true);
  const [sendText , setSendText] = useState('');
  const [sendUserName , setSendUserName] = useState('');



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
  const fetchchats = async () => {
    try {
      const path = `/api/chat`;
      console.log("path=", path);
      const response = await fetch(path, { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // setPoint(data);
        setchats(data)
      } else {
        console.error("Failed to fetch");
      }
    } catch (error) {
      console.error("Error fetching:", error);
    } finally {
      setLoadingChat(false);
    }
  };
  const handleSubmit = async () => {
    if (!sendText || !sendUserName) {
      alert("Please select an image and write some text.");
      return;
    }

    const formData = new FormData();
    formData.append("text", sendText);
    formData.append("userName", sendUserName);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        alert("Post created successfully!");
        // onPostCreated(); // 投稿成功後の処理を実行
        // setSelectedImage(null);
        // setText("");
      } else {
        alert("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("An error occurred while creating the post");
    }
  };
  useEffect(() => {
    fetchPoints();
    fetchchats();
  }, []);

  if (!loading && !point &&!loadingChat) {
    notFound();
  }

  if (loading && loadingChat) {
    return <HamstarLoader />;
  }

  return (
    <div>
      <button onClick={() => window.history.back()} style={{ marginBottom: '10px' }}>
        戻る
      </button>
      {/* <p>{JSON.stringify(chats)}</p>
      <h1>まほさんが色々頑張って作るページ。コメントスレッドとか？</h1>
      <p>{point?.id}</p> */}
      {chats.map((chat, index) => (
        <>
          <ChatBubble key={index} {...chat} />
          
        </>
      ))}<input type="text" onChange={(e) => {setSendText(e.target.value)}}/>
          <input type="text" onChange={(e) => {setSendUserName(e.target.value)}}/>
          <input type="button" value="送信" onClick={() => {
            console.log(sendText);
            console.log(sendUserName);
            handleSubmit()
          }}/>
          <input type="button" value="更新" onClick={() => {
            console.log(sendText);
            console.log(sendUserName);
            fetchchats();
          }}/>
    </div>
  );
}
 