import React, { useEffect, useState, useRef } from "react";
import styles from './fixed-bottom-navigation.module.css';

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

  const handleRippleEffect = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log('effect')
    const button = event.currentTarget;
    const ripple = document.createElement("span");
    ripple.classList.add(styles.ripple);

    // 波紋の位置を計算
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

    button.appendChild(ripple);

    // アニメーションが終了したら波紋を削除
    ripple.addEventListener("animationend", () => {
      ripple.remove();
    });
  };

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
        {[{ src: "/footer/home.png", text: "ホーム", menuValue: 0 },
          { src: "/footer/search.png", text: "検索", menuValue: 1 },
          { src: "/footer/plus.png", text: "投稿", menuValue: 2 },
          { src: "/footer/heart.png", text: "お気に入り", menuValue: 3 },
          { src: "/footer/profile.png", text: "マイページ", menuValue: 4 }]
          .map((item, index) => (
          <div
            key={index}
            className={value === item.menuValue ? `${styles.navItem} ${styles.activeNavItem}` : styles.navItem}
            onClick={(event) => {
              setValue(item.menuValue);
              handleRippleEffect(event);
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
