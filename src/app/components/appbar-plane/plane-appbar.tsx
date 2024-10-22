import React from 'react';
import './plane-appbar.css'; // CSSファイルを分ける場合

const PlaneAppBar = () => {
  return (
    <div className="app-bar">
      <div className="logo">
        <img src="logo.png" alt="logo" /> {/* ロゴ画像 */}
        <span>Mozuku taira room</span>
      </div>
      <div className="nav-links">
        <a href="#">PRODUCTS</a>
        <a href="#">PRICING</a>
        <a href="#">BLOG</a>
      </div>
      <div className="profile-icon">R</div>
    </div>
  );
};

export default PlaneAppBar;
