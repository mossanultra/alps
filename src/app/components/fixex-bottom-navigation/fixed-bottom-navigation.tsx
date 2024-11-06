import React, { useEffect, useState, useRef } from "react";
import styles from './fixed-bottom-navigation.module.css'; // Import the CSS module

interface FixedBottomNavigationProps {
  onChangeMenu: (menutype: MenuType) => void;
}

export enum MenuType {
  TIIKAWA,
  HATIWARE,
  KURIMANJUU,
  MARMOT,
  USAGI
}

export default function FixedBottomNavigation(props: FixedBottomNavigationProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const onChangeMenu = props.onChangeMenu;

  useEffect(() => {
    const menuTypes = [
      { menuType: MenuType.TIIKAWA, value: 0 },
      { menuType: MenuType.HATIWARE, value: 1 },
      { menuType: MenuType.KURIMANJUU, value: 2 },
      { menuType: MenuType.MARMOT, value: 3 },
      { menuType: MenuType.USAGI, value: 4 },
    ];
    const menuType: MenuType = menuTypes.find((e) => e.value === value)!.menuType;
    onChangeMenu(menuType);
  }, [value, onChangeMenu]);

  return (
    <div className={styles.container} ref={ref}>
      <div className={styles.bottomNav}>
        <div
          className={value === 0 ? `${styles.navItem} ${styles.activeNavItem}` : styles.navItem}
          onClick={() => setValue(0)}
        >
          <img
            src="/footer/home.png"
            alt="Home"
            className={styles.icon}
          />
          <span>ホーム</span>
        </div>
        <div
          className={value === 1 ? `${styles.navItem} ${styles.activeNavItem}` : styles.navItem}
          onClick={() => setValue(1)}
        >
          <img
            src="/footer/search.png"
            alt="Search"
            className={styles.icon}
          />
          <span>検索</span>
        </div>
        <div
          className={value === 2 ? `${styles.navItem} ${styles.activeNavItem}` : styles.navItem}
          onClick={() => setValue(2)}
        >
          <img
            src="/footer/plus.png"
            alt="Plus"
            className={styles.icon}
          />
          <span>投稿</span>
        </div>
        <div
          className={value === 3 ? `${styles.navItem} ${styles.activeNavItem}` : styles.navItem}
          onClick={() => setValue(3)}
        >
          <img
            src="/footer/heart.png"
            alt="Heart"
            className={styles.icon}
          />
          <span>お気に入り</span>
        </div>
        <div
          className={value === 4 ? `${styles.navItem} ${styles.activeNavItem}` : styles.navItem}
          onClick={() => setValue(4)}
        >
          <img
            src="/footer/profile.png"
            alt="Profile"
            className={styles.icon}
          />
          <span>マイページ</span>
        </div>
      </div>
    </div>
  );
}
