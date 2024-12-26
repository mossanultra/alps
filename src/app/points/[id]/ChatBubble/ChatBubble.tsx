import React from 'react';
import styles from './ChatBubble.module.css';

// Propsの型定義
interface ChatBubbleProps {
  userName: string;
  userIcon: string;
  text: string;
  isselfchat: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ userName, userIcon, text, isselfchat }) => {
  const containerstyle = isselfchat ? styles.chatContainer_self : styles.chatContainer_other;
  const usernamestyle = isselfchat ? styles.userName_self : styles.userName_other;
  const chatBubblestyle = isselfchat ? styles.chatBubble_self : styles.chatBubble_other;
  return (
    <div className={containerstyle}>
      <img src={userIcon} alt={`${userName} icon`} className={styles.userIcon} />
      <div className={styles.bubbleWrapper}>
        <div className={usernamestyle}>{userName}</div>
        <div className={chatBubblestyle}>{text}</div>
      </div>
    </div>
  );
};

export default ChatBubble;
