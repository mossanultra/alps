// Card.tsx
import React from "react";
import styles from "./pr-card.module.css";

type PrCardProps = {
  backgroundImage: string;
  text: string;
};

const PrCard: React.FC<PrCardProps> = ({ backgroundImage, text }) => (
  <div className={`${styles.card} ${styles.ad}`}>
    <div
      className={styles.cardImage}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    />
    <div className={styles.cardText}>{text}</div>
  </div>
);

export default PrCard;
