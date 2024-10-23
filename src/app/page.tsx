'use client';
import { useRef, useState, useEffect } from "react";
import CardList from "./components/card-list/card-list";
import Otokoume from "./components/otokoume/otokoume";
import PlaneAppBar from "./components/appbar-plane/plane-appbar";
import FixedBottomNavigation, { MenuType } from "./components/fixex-bottom-navigation/fixed-bottom-navigation";
import Wheather from "./components/wheather/wheather";
import RssFeedList from "./components/feed/feed";
import ThreeDCard from "./components/threed-card/threed-card";

function Contents({ menutype }: { menutype: MenuType }) {
  if (menutype === MenuType.TIIKAWA) {
    return <CardList />;
  }
  if (menutype === MenuType.HATIWARE) {
    return <Otokoume />;
  }
  if (menutype === MenuType.KURIMANJUU) {
    return <Wheather city={"017010"}></Wheather>;
  }
  if (menutype === MenuType.MARMOT) {
    return (<>
    <ThreeDCard colorTheme={'purple'}></ThreeDCard>
    <ThreeDCard colorTheme={'green'}></ThreeDCard>
    <ThreeDCard colorTheme={'yellow'}></ThreeDCard>
    <ThreeDCard colorTheme={'blue'}></ThreeDCard>
    <ThreeDCard colorTheme={'pink'}></ThreeDCard>
    <RssFeedList></RssFeedList>
    </> );
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
      <div style={{ paddingTop: `${appBarHeight + 48}px` }}>
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
