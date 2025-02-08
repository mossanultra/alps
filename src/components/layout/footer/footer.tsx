import Link from "next/link";
import styles from "./footer.module.css";

export enum MenuType {
  TIIKAWA,
  HATIWARE,
  KURIMANJUU,
  MARMOT,
  USAGI,
}

const menuItems = [
  { src: "/images/footer/home.jpg", text: "ホーム", menuValue: 0, link: "/home" },
  { src: "/images/footer/search.jpg", text: "検索", menuValue: 1, link: "/" },
  { src: "/images/footer/post.jpg", text: "投稿", menuValue: 2, link: "/post" },
  { src: "/images/footer/fava.jpg", text: "お気に入り", menuValue: 3, link: "/favorite" },
  { src: "/images/footer/profile.jpg", text: "マイページ", menuValue: 4, link: "/profile" },
];

export default function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.bottomNav}>
        {menuItems.map((item, index) => (
          <Link key={index} href={item.link} className={styles.link}>
            <div className={styles.navItem}>
              <img src={item.src} alt={item.text} className={styles.icon} />
              <span>{item.text}</span>
            </div>
          </Link>
          //   <div key={index} className={styles.navItem}>
          //   <img src={item.src} alt={item.text} className={styles.icon} />
          //   <span>{item.text}</span>
          // </div>
      ))}
      </div>
    </div>
  );
}