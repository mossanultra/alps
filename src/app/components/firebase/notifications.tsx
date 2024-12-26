import React, { useState, useEffect } from "react";
import { requestForToken, onMessageListener } from "@/firebase";

// コンポーネント内で使用する通知データの型を定義
interface NotificationData {
  title: string;
  body: string;
}

const NotificationToken: React.FC = () => {
  const [notification, setNotification] = useState<NotificationData>({ title: "", body: "" });

  useEffect(() => {
    if (notification?.title) {
      alert("title: " + notification.title + "\nbody: " + notification.body);
    }
  }, [notification]);

  // Push通知トークンのリクエスト
  requestForToken();

  // メッセージリスナー
  onMessageListener()
    .then((payload) => {
      setNotification({
        title: payload.notification?.title || "",
        body: payload.notification?.body || "",
      });
    })
    .catch((err: Error) => console.log("failed: ", err));

  return <div />;
};

export default NotificationToken;
