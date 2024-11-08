// Card.tsx
import React from "react";
import styles from "./content-card.module.css";

type ContentCardProps = {
  post: {
    guid: string;
    text: string;
    imageBase64: string;
  };
  onClick: () => void;
};

const ContentCard: React.FC<ContentCardProps> = ({ post, onClick }) => (
  <div className={styles.card2} onClick={onClick}>
    <img src={post.imageBase64} alt={post.text} className={styles.cardImage2} />
    <div className={styles.cardText}>{post.text}</div>
    <div className={styles.cardSubtext}>山口県&nbsp;萩市</div>
  </div>
);

export default ContentCard;
