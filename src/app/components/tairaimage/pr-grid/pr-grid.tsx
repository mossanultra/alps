import styles from "./pr-grid.module.css";

export default function PrGrid() {
  return (
    <div className={styles.grid}>
      {[...Array(3)].map((_, index) => (
        <div className={`${styles.card} ${styles.ad}`} key={`ad-${index}`}>
          <div
            className={styles.cardImage}
            style={{
              backgroundImage:
                "url('https://craft-gin.info/wp-content/uploads/2020/03/20200320020532-1024x447.png')",
            }}
          />
          <div className={styles.cardText}>広告</div>
        </div>
      ))}
    </div>
  );
}
