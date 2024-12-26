import React from 'react';
import styles from './chatthread.module.css';

// Define the type for a single message
interface Message {
  text: string;
  timestamp: string;
  isSender: boolean;
}

// Define the props type for the ChatThread component
interface ChatThreadProps {
  messages: Message[];
}

const ChatThread: React.FC<ChatThreadProps> = ({ messages }) => {
  return (
    <div className={styles.chatThread}>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`${styles.message} ${
            message.isSender ? styles.sender : styles.receiver
          }`}
        >
          <div className={styles.text}>{message.text}</div>
          <div className={styles.timestamp}>{message.timestamp}</div>
        </div>
      ))}
    </div>
  );
};

export default ChatThread;
