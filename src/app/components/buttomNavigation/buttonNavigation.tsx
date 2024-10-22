import React, { useEffect, useState, useRef } from "react";

interface FixedBottomNavigationProps {
  onChangeMenu: (menutype: MenuType) => void;
}

export enum MenuType {
  TIIKAWA,
  HATIWARE,
  KURIMANJUU,
  MARMOT,
}

export default function FixedBottomNavigation(props: FixedBottomNavigationProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const onChangeMenu = props.onChangeMenu;

  useEffect(() => {
    const menuTypes = [
      {
        menuType: MenuType.TIIKAWA,
        value: 0,
      },
      {
        menuType: MenuType.HATIWARE,
        value: 1,
      },
      {
        menuType: MenuType.KURIMANJUU,
        value: 2,
      },
      {
        menuType: MenuType.MARMOT,
        value: 3,
      },
    ];
    const menuType: MenuType = menuTypes.find(
      (e) => e.value === value
    )!.menuType;
    onChangeMenu(menuType);
  }, [value, onChangeMenu]);

  return (
    <div style={containerStyle} ref={ref}>
      <div style={bottomNavStyle}>
        <div
          style={value === 0 ? activeNavItemStyle : navItemStyle}
          onClick={() => setValue(0)}
        >
          <img
            src="/icon512_maskable.png"
            alt="ちいかわ"
            style={iconStyle}
          />
          <span>ちいかわ</span>
        </div>
        <div
          style={value === 1 ? activeNavItemStyle : navItemStyle}
          onClick={() => setValue(1)}
        >
          <img
            src="/hatiware.jpeg"
            alt="はちわれ"
            style={iconStyle}
          />
          <span>はちわれ</span>
        </div>
        <div
          style={value === 2 ? activeNavItemStyle : navItemStyle}
          onClick={() => setValue(2)}
        >
          <img
            src="/kurimanjuu.jpg"
            alt="栗まんじゅう"
            style={iconStyle}
          />
          <span>栗まんじゅう</span>
        </div>
        <div
          style={value === 3 ? activeNavItemStyle : navItemStyle}
          onClick={() => setValue(3)}
        >
          <img
            src="/ma-motto.jpeg"
            alt="もーまっと"
            style={iconStyle}
          />
          <span>もーまっと</span>
        </div>
      </div>
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  paddingBottom: "56px", // Reserve space for the bottom navigation
};

const bottomNavStyle: React.CSSProperties = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  display: "flex",
  justifyContent: "space-around",
  backgroundColor: "#fff",
  borderTop: "1px solid #ddd",
  boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
  padding: "10px 0",
  zIndex: 1000,
};

const navItemStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  color: "#666",
  fontSize: "0.875rem",
};

const activeNavItemStyle: React.CSSProperties = {
  ...navItemStyle,
  color: "#000",
};

const iconStyle: React.CSSProperties = {
  width: "24px",
  height: "24px",
  marginBottom: "4px",
};
