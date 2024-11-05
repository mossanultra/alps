import { useState } from "react";
import "./tab.css";

export default function Tab() {
  const [activeTab, setActiveTab] = useState<string>("トチの情報");

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };
  return (
    <div className="tabs">
      {["トチの情報", "シゴトの情報", "クラシの情報"].map((tabName) => (
        <button
          key={tabName}
          className={`tab ${activeTab === tabName ? "active" : ""}`}
          onClick={() => handleTabChange(tabName)}
        >
          {tabName}
        </button>
      ))}
    </div>
  );
}
