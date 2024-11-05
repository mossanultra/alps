import React from "react";
import "./taira-image.css";
import Tab from "./tab/tab";
import PrGrid from "./pr-grid/pr-grid";
import ContentGrid from "./content-grid/content-grid";

const TairaImage: React.FC = () => {
  return (
    <div className="taira-image-app">
      <Tab></Tab>
      <PrGrid></PrGrid>
      <ContentGrid></ContentGrid>

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
