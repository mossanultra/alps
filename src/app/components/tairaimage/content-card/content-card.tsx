import React, { useState } from "react";
import styles from "./content-card.module.css";

type ContentCardProps = {
  post: {
    guid: string;
    text: string;
    imgSrc: string;
  };
  onClick: () => void;
};

const ContentCard: React.FC<ContentCardProps> = ({ post, onClick }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);

  const handleLike = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent click propagation to parent
    setLiked(!liked);
    setLikeCount((prevCount) => prevCount + (liked ? -1 : 1));
  };

  return (
    <div className={styles.card} onClick={onClick}>
      <div
        className={styles.cardImage}
        style={{ backgroundImage: `url(${post.imgSrc})` }}
      ></div>
      <div className={styles.cardBody}>
        <p className={styles.cardText}>{post.text}</p>
        <div className={styles.likeContainer}>
          <button className={styles.likeButton} onClick={handleLike}>
            {liked ? "❤️" : "♡"}
          </button>
          <span className={styles.likeCount}>{likeCount}</span>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;