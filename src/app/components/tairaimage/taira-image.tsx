import React, { useState } from "react";
import "./taira-image.css";

const TairaImage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("トチの情報");

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className="taira-image-app">
      {/* タブメニュー */}
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

      {/* カードグリッド */}
      <div className="grid">
        {[...Array(3)].map((_, index) => (
          <div className="card ad" key={`ad-${index}`}>
            <div className="card-image" 
                          style={{
                            backgroundImage:"url('https://craft-gin.info/wp-content/uploads/2020/03/20200320020532-1024x447.png')"
                          }}
            />
            <div className="card-text">広告</div>
          </div>
        ))}
      </div>
      <div className="grid2">
        {[...Array(6)].map((_, index) => (
          <div className="card2" key={`card-${index}`}>
            <div
              className="card-image2"
              style={{
                backgroundImage:"url('https://t3.ftcdn.net/jpg/02/65/23/70/360_F_265237090_Muthvb72m2POYFjyx7F5UCQLh9JdBtKN.jpg')"
              }}
            />
            <div className="card-text">本文を追加</div>
            <div className="card-subtext">山口県&nbsp;萩市</div>
          </div>
        ))}
      </div>

      {/* ボトムナビゲーション */}
      <div className="bottom-navigation">
        <button className="nav-item">ホーム</button>
        <button className="nav-item">検索</button>
        <button className="nav-item">投稿</button>
        <button className="nav-item">お気に入り</button>
        <button className="nav-item">マイページ</button>
      </div>
    </div>
  );
};

export default TairaImage;
