"use client"; // これでクライアントコンポーネント化
import styles from "./footer.module.css";

export enum MenuType {
  TIIKAWA,
  HATIWARE,
  KURIMANJUU,
  MARMOT,
  USAGI,
}

const menuItems = [
  { src: "/images/footer/home.jpg", text: "ホーム", menuValue: 0 },
  { src: "/images/footer/search.jpg", text: "検索", menuValue: 1 },
  { src: "/images/footer/post.jpg", text: "投稿", menuValue: 2 },
  { src: "/images/footer/fava.jpg", text: "お気に入り", menuValue: 3 },
  { src: "/images/footer/profile.jpg", text: "マイページ", menuValue: 4 },
];

export default function Footer() {
  return (
    <div className={styles.container}>
    <div className={styles.bottomNav} >
      {menuItems.map((item, index) => (
        <div
          key={index}
          className={styles.navItem}
          onClick={() => {
            
          }}
        >
          <img src={item.src} alt={item.text} className={styles.icon} />
          <span>{item.text}</span>
        </div>
      ))}
    </div>
    </div>
  );
}
