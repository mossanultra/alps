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
};

function Contents({ menutype }: { menutype: TabMenu }) {
  const [points, setPoints] = useState<Point[]>([]);
  const [loading, setLoading] = useState(false);
  // const [center , setCenter] = useState({ lat: 37.7608, lng: 140.473 });
  // const [zoom , setZoom] = useState(8.5);

  const zoom = 8.5; // ズームレベル
  const fetchPoints = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/points", { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
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

    return (
      <div>
        <h1>mozukuの地図</h1>
        <MapWithInfoMarker
          zoom={zoom}
          markers={points}
          onPointRegisterd={fetchPoints}
        ></MapWithInfoMarker>
      </div>
    );
  }
  if (menutype === TabMenu.LIFE) {
    return <></>;
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

    </div>
  );
};

export default TairaImage;
