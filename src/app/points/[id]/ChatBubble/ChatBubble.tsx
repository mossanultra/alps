import React from 'react';
import styles from './ChatBubble.module.css';

// Propsの型定義
interface ChatBubbleProps {
  userName: string;
  userIcon: string;
  text: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ userName, userIcon, text }) => {
  return (
    <div className={styles.chatContainer}>
      <img src={userIcon} alt={`${userName} icon`} className={styles.userIcon} />
      <div className={styles.bubbleWrapper}>
        <div className={styles.userName}>{userName}</div>
        <div className={styles.chatBubble}>{text}</div>
      </div>
    </div>
  );
};

export default ChatBubble;
