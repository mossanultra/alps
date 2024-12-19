import React, { useState } from "react";
import styles from "./taira-image.module.css";
import Tab, { TabMenu } from "./tab/tab";
import ContentGrid from "./content-grid/content-grid";
import MapWithInfoMarker from "../../components/map/map";

function Contents({ menutype }: { menutype: TabMenu }) {
  const zoom = 13; // ズームレベル

  if (menutype === TabMenu.LAND) {
    return (
      <div>
        <h1>mozukuの地図</h1>
        <MapWithInfoMarker zoom={zoom}></MapWithInfoMarker>
      </div>
    );
  }
  if (menutype === TabMenu.LIFE) {
    return <></>;
  }
  if (menutype === TabMenu.WORK) {
    return (
      <>
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
