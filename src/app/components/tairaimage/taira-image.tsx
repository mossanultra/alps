import React from "react";
import styles from "./taira-image.module.css";
import Tab from "./tab/tab";
import PrGrid from "./pr-grid/pr-grid";
import ContentGrid from "./content-grid/content-grid";

const TairaImage = () => {
  return (
    <div className={styles.tairaImageApp}>
      <Tab />
      <PrGrid />
      <ContentGrid />

      {/* ボトムナビゲーション
      <div className={styles.bottomNavigation}>
        <button className={styles.navItem}>ホーム</button>
        <button className={styles.navItem}>検索</button>
        <button className={styles.navItem}>投稿</button>
        <button className={styles.navItem}>お気に入り</button>
        <button className={styles.navItem}>マイページ</button>
      </div> */}
    </div>
  );
};

export default TairaImage;
