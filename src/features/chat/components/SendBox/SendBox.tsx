import { useState } from "react";
import { AiOutlineStar, AiOutlineReload, AiOutlineSend } from "react-icons/ai";
import styles from "./SendBox.module.css";

interface SendBoxProps {
  onSend: (message: string) => void;
  onRefresh: () => void;
  onFavorite: () => void;
}

export default function SendBox({ onSend, onRefresh, onFavorite }: SendBoxProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage(""); // 送信後にクリア
  };

  return (
    <div className={styles.sendBox}>
      <button className={styles.iconButton} onClick={onFavorite}>
        <AiOutlineStar />
      </button>
      <button className={styles.iconButton} onClick={onRefresh}>
        <AiOutlineReload />
      </button>
      <input
        type="text"
        className={styles.input}
        placeholder="メッセージを入力..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className={styles.sendButton} onClick={handleSend}>
        <AiOutlineSend />
      </button>
    </div>
  );
}
