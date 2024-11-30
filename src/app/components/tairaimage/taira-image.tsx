import React, { useEffect, useState } from "react";
import styles from "./taira-image.module.css";
import Tab, { TabMenu } from "./tab/tab";
import PrGrid from "./pr-grid/pr-grid";
import ContentGrid from "./content-grid/content-grid";
import MapWithInfoMarker from "../../components/map/map";
import HamstarLoader from "../loading/hamster/hamster";
type Point = {
  lat: number;
  lng: number;
  id: string;
}

function Contents({ menutype }: { menutype: TabMenu }) {
  const [points, setPoints] = useState<Point[]>([]);
  const [loading, setLoading] = useState(false);
  const fetchPoints = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/points", { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setPoints(data);
      } else {
        console.error("Failed to fetch");
      }
    } catch (error) {
      console.error("Error fetching:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPoints();
  }, []);

  if (menutype === TabMenu.LAND) {
    if (loading) {
      return <HamstarLoader />;
    }
    const center = { lat: 37.7608, lng: 140.473  }; // 東京の緯度と経度
    const zoom = 8.5; // ズームレベル
    // const markers = [
    //   {
    //     lat: 35.6895,
    //     lng: 139.6917,
    //     iconUrl: "/chikawa1.jpg",
    //     infoText: "東京の情報",
    //     infoTitle: "ここはTitle",
    //     infoContent: "ここはContent",
    //     image: "/akiyama/akiyama1.png",
    //   },
    //   {
    //     lat: 34.6937,
    //     lng: 135.5023,
    //     iconUrl: "/chikawa1.jpg",
    //     infoText: "大阪の情報",
    //     infoTitle: "ここはTitle",
    //     infoContent: "ここはContent",
    //     image: "/akiyama/akiyama2.png",
    //   },
    //   {
    //     lat: 35.0116,
    //     lng: 135.7681,
    //     iconUrl: "/chikawa1.jpg",
    //     infoText: "京都の情報",
    //     infoTitle: "ここはTitle",
    //     infoContent: "ここはContent",
    //     image: "/akiyama/akiyama3.png",
    //   },
    //   {
    //     lat: 41.768672,
    //     lng: 140.728932,
    //     iconUrl: "/chikawa1.jpg",
    //     infoText: "はこだて",
    //     infoTitle: "ここはTitle",
    //     infoContent: "ここはContent",
    //     image: "/akiyama/koara.jpg",
    //   },
    // ];
    return (
      <div>
        <h1>mozukuの地図</h1>
        <MapWithInfoMarker
          center={center}
          zoom={zoom}
          markers={points}
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
