'use client';
import { useRef, useState, useEffect } from "react";
import CardList from "./components/cardList/cardList";
import Otokoume from "./components/otokoume/otokoume";
import PlaneAppBar from "./components/appbar-plane/plane-appbar";
import FixedBottomNavigation, { MenuType } from "./components/buttomNavigation/FixedBottomNavigation";

function Contents({ menutype }: { menutype: MenuType }) {
  if (menutype === MenuType.TIIKAWA) {
    return <CardList />;
  }
  if (menutype === MenuType.HATIWARE) {
    return <Otokoume />;
  }
  if (menutype === MenuType.KURIMANJUU) {
    return <></>;
  }
  if (menutype === MenuType.MARMOT) {
    return <></>;
  }
}

export default function Home() {
  const [menu, setMenu] = useState(MenuType.TIIKAWA);
  const [appBarHeight, setAppBarHeight] = useState(0); // AppBarの高さを保存するstate
  const appBarRef = useRef<HTMLDivElement>(null); // AppBarの参照を保存するref

  // useEffectでAppBarの高さを取得
  useEffect(() => {
    if (appBarRef.current) {
      setAppBarHeight(appBarRef.current.clientHeight); // AppBarの高さを取得してstateに保存
    }
  }, []);

  return (
    <div>
      {/* AppBarの参照をrefに渡す */}
      <div ref={appBarRef}>
        <PlaneAppBar />
      </div>

      {/* AppBarの高さに応じてpaddingTopを動的に設定 */}
      <div style={{ paddingTop: `${appBarHeight}px` }}>
        <Contents menutype={menu} />
      </div>

      <FixedBottomNavigation
        onChangeMenu={(menutype: MenuType): void => {
          setMenu(menutype);
        }}
      />
    </div>
  );
}
