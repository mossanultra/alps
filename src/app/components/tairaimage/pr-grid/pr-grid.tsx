// PrGrid.tsx
import React from "react";
import styles from "./pr-grid.module.css";
import PrCard from "../pr-card/pr-card"; // インポート

export default function PrGrid() {
  return (
    <div className={styles.grid}>
      {[...Array(3)].map((_, index) => (
        <PrCard
          key={`ad-${index}`}
          backgroundImage="https://craft-gin.info/wp-content/uploads/2020/03/20200320020532-1024x447.png"
          text="広告"
        />
      ))}
    </div>
  );
}
