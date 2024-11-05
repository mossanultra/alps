import { useState } from "react";
import styles from "./tab.module.css";

export default function Tab() {
  const [activeTab, setActiveTab] = useState("トチの情報");

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className={styles.tabs}>
      {["トチの情報", "シゴトの情報", "クラシの情報"].map((tabName, index) => (
        <button
          key={tabName}
          className={`${styles.tab} ${activeTab === tabName ? styles[`active${index + 1}`] : ""}`}
          onClick={() => handleTabChange(tabName)}
        >
          {tabName}
        </button>
      ))}
    </div>
  );
}
