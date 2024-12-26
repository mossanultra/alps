import { useState } from "react";
import styles from "./tab.module.css";

export enum TabMenu {
  LAND,
  WORK,
  LIFE,
}
interface TabMenuProps {
  onChangeSelectedTab: (selectedTab: TabMenu) => void;
}

export default function Tab(props: TabMenuProps) {
  const [activeTab, setActiveTab] = useState("トチの情報");
  const tabs = [
    {
      name: "トチの情報",
      type: TabMenu.LAND,
    },
    { name: "シゴトの情報", type: TabMenu.WORK },
    { name: "クラシの情報", type: TabMenu.LIFE },
  ];
  type Tab = {
    name: string;
    type: TabMenu;
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab.name);
    props.onChangeSelectedTab(tab.type);
  };

  return (
    <div className={styles.tabs}>
      {tabs.map((tab, index) => (
        <button
          key={tab.name}
          className={`${styles.tab} ${
            activeTab === tab.name ? styles[`active${index + 1}`] : ""
          }`}
          onClick={() => handleTabChange(tab)}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
}
