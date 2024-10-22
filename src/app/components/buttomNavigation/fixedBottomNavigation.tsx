import React, { useEffect, useState, useRef } from "react";
import styles from "./FixedBottomNavigation.module.css"; // Import the CSS module

interface FixedBottomNavigationProps {
  onChangeMenu: (menutype: MenuType) => void;
}

export enum MenuType {
  TIIKAWA,
  HATIWARE,
  KURIMANJUU,
  MARMOT,
}

export default function FixedBottomNavigation(
  props: FixedBottomNavigationProps
) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const onChangeMenu = props.onChangeMenu;

  useEffect(() => {
    const menuTypes = [
      { menuType: MenuType.TIIKAWA, value: 0 },
      { menuType: MenuType.HATIWARE, value: 1 },
      { menuType: MenuType.KURIMANJUU, value: 2 },
      { menuType: MenuType.MARMOT, value: 3 },
    ];
    const menuType: MenuType = menuTypes.find(
      (e) => e.value === value
    )!.menuType;
    onChangeMenu(menuType);
  }, [value, onChangeMenu]);

  return (
    <div className={styles.container} ref={ref}>
      <div className={styles.bottomNav}>
        <div
          className={
            value === 0
              ? `${styles.navItem} ${styles.activeNavItem}`
              : styles.navItem
          }
          onClick={() => setValue(0)}
        >
          <img
            src="/icon512_maskable.png"
            alt="ちいかわ"
            className={styles.icon}
          />
          <span>ちいかわ</span>
        </div>
        <div
          className={
            value === 1
              ? `${styles.navItem} ${styles.activeNavItem}`
              : styles.navItem
          }
          onClick={() => setValue(1)}
        >
          <img src="/hatiware.jpeg" alt="はちわれ" className={styles.icon} />
          <span>はちわれ</span>
        </div>
        <div
          className={
            value === 2
              ? `${styles.navItem} ${styles.activeNavItem}`
              : styles.navItem
          }
          onClick={() => setValue(2)}
        >
          <img
            src="/kurimanjuu.jpg"
            alt="栗まんじゅう"
            className={styles.icon}
          />
          <span>栗まんじゅう</span>
        </div>
        <div
          className={
            value === 3
              ? `${styles.navItem} ${styles.activeNavItem}`
              : styles.navItem
          }
          onClick={() => setValue(3)}
        >
          <img src="/ma-motto.jpeg" alt="もーまっと" className={styles.icon} />
          <span>もーまっと</span>
        </div>
      </div>
    </div>
  );
}
