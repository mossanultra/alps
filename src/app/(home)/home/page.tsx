'use client'; // クライアントコンポーネントとして明示
import React, { useState } from "react";
import styles from "./home.module.css";
import Tab, { TabMenu } from "@/features/home/components/tab/tab";
// import ContentGrid from "@/features/home/components/content-grid/content-grid";
import MapWithCustomModalMarker from "../map/map";

function Contents({ menutype }: { menutype: TabMenu }) {
  const zoom = 13; // ズームレベル

  if (menutype === TabMenu.LAND) {
    return (
      <div>
        <MapWithCustomModalMarker zoom={zoom} userId={""} points={[]}></MapWithCustomModalMarker>
      </div>
    );
  }
  if (menutype === TabMenu.LIFE) {
    return <></>;
  }
  if (menutype === TabMenu.WORK) {
    return (
      <>
        {/* <ContentGrid /> */}
      </>
    );
  }
}

const HomePage = () => {
  const [selectedTab, setSelectedTab] = useState(TabMenu.LAND);
  return (
    <div className={styles.tairaImageApp}>
      <Tab
        onChangeSelectedTab={function (selectedTab: TabMenu): void {
          if(selectedTab === TabMenu.LAND) {
            setSelectedTab(TabMenu.LAND);
          }
        }}
      />
      <Contents menutype={selectedTab}></Contents>
    </div>
  );
};

export default HomePage;