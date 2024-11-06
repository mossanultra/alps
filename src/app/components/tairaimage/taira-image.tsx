import React, { useState } from "react";
import styles from "./taira-image.module.css";
import Tab, { TabMenu } from "./tab/tab";
import PrGrid from "./pr-grid/pr-grid";
import ContentGrid from "./content-grid/content-grid";
import MapWithInfoMarker from "../../components/map/map";

function Contents({ menutype }: { menutype: TabMenu }) {
  if (menutype === TabMenu.LAND) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY; // Google Maps APIキーをここに挿入
    const center = { lat: 35.6895, lng: 139.6917 }; // 東京の緯度と経度
    const zoom = 5; // ズームレベル
    const markers = [
      {
        lat: 35.6895,
        lng: 139.6917,
        iconUrl: "/chikawa1.jpg",
        infoText: "東京の情報",
        infoTitle: "ここはTitle",
        infoContent: "ここはContent",
        image: "/akiyama/akiyama1.png",
      },
      {
        lat: 34.6937,
        lng: 135.5023,
        iconUrl: "/chikawa1.jpg",
        infoText: "大阪の情報",
        infoTitle: "ここはTitle",
        infoContent: "ここはContent",
        image: "/akiyama/akiyama2.png",
      },
      {
        lat: 35.0116,
        lng: 135.7681,
        iconUrl: "/chikawa1.jpg",
        infoText: "京都の情報",
        infoTitle: "ここはTitle",
        infoContent: "ここはContent",
        image: "/akiyama/akiyama3.png",
      },
      {
        lat: 41.768672,
        lng: 140.728932,
        iconUrl: "/chikawa1.jpg",
        infoText: "はこだて",
        infoTitle: "ここはTitle",
        infoContent: "ここはContent",
        image: "/akiyama/koara.jpg",
      },
    ];
    return (
      <div>
        <h1>mozukuの地図</h1>
        <MapWithInfoMarker
          apiKey={apiKey!}
          center={center}
          zoom={zoom}
          markers={markers}
        ></MapWithInfoMarker>
      </div>
    );
  }
  if (menutype === TabMenu.LIFE) {
    return (
      <>
      </>
    );
  }
  if (menutype === TabMenu.WORK) {
    return (
        <>
          <PrGrid />
          <ContentGrid />
        </>
      );
    }
}

const TairaImage = () => {
  const [selectedTab, setSelectedTab] = useState(TabMenu.LAND);
  return (
    <div className={styles.tairaImageApp}>
      <Tab
        onChangeSelectedTab={function (selectedTab: TabMenu): void {
          setSelectedTab(selectedTab);
        }}
      />
      <Contents menutype={selectedTab}></Contents>

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
