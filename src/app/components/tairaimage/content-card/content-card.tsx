import React, { useState } from "react";
import styles from "./content-card.module.css";

type ContentCardProps = {
  post: {
    guid: string;
    text: string;
    imageBase64: string;
  };
  onClick: () => void;
};

const ContentCard: React.FC<ContentCardProps> = ({ post, onClick }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);

  const handleLike = (event: React.MouseEvent) => {
    event.stopPropagation(); // onClickの伝播を防ぐ
    setLiked(!liked);
    setLikeCount(prevCount => prevCount + (liked ? -1 : 1));
  };

  return (
    <div className={styles.card2} onClick={onClick}>
      <img src={post.imageBase64} alt={post.text} className={styles.cardImage2} />
      <div className={styles.cardText}>{post.text}</div>
      <div className={styles.cardSubtext}>山口県&nbsp;萩市</div>
      <div className={styles.likeContainer}>
        <button className={styles.likeButton} onClick={handleLike}>
          {liked ? "❤️" : "♡"}
        </button>
        <span className={styles.likeCount}>{likeCount}</span>
      </div>
    </div>
  );
};

export default ContentCard;
