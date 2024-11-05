import styles from "./content-grid.module.css";

export default function ContentGrid() {
  return (
    <div className={styles.grid2}>
      {[...Array(6)].map((_, index) => (
        <div className={styles.card2} key={`card-${index}`}>
          <div
            className={styles.cardImage2}
            style={{
              backgroundImage:
                "url('https://t3.ftcdn.net/jpg/02/65/23/70/360_F_265237090_Muthvb72m2POYFjyx7F5UCQLh9JdBtKN.jpg')",
            }}
          />
          <div className={styles.cardText}>本文を追加</div>
          <div className={styles.cardSubtext}>山口県&nbsp;萩市</div>
        </div>
      ))}
    </div>
  );
}
