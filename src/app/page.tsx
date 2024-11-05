"use client";
import { useRef, useState, useEffect } from "react";
import CardList from "./components/card-list/card-list";
import PlaneAppBar from "./components/appbar-plane/plane-appbar";
import FixedBottomNavigation, {
  MenuType,
} from "./components/fixex-bottom-navigation/fixed-bottom-navigation";
import Wheather from "./components/wheather/wheather";
import RssFeedList from "./components/feed/feed";
import RadioButton from "./components/radio-button/radio-button";
import TairaImage from "./components/tairaimage/taira-image";
import Map from "./components/map/map";

function Contents({ menutype }: { menutype: MenuType }) {
  const [selectCityId, setSelectCityId] = useState("017010");
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY; // Google Maps APIキーをここに挿入
  const center = { lat: 35.6895, lng: 139.6917 }; // 東京の緯度と経度
  const zoom = 5; // ズームレベル

  if (menutype === MenuType.TIIKAWA) {
    return <CardList />;
  }
  if (menutype === MenuType.HATIWARE) {
    return <TairaImage />;
  }
  if (menutype === MenuType.KURIMANJUU) {
    return (
      <>
        <RadioButton
          citylist={[
            { name: "函館", id: "017010" },
            { name: "東京", id: "130010" },
          ]}
          onSelect={function (id: string): void {
            setSelectCityId(id);
          }}
        ></RadioButton>
        <Wheather city={selectCityId}></Wheather>;
      </>
    );
  }
  if (menutype === MenuType.MARMOT) {
    return (
      <>
        <RssFeedList></RssFeedList>
      </>
    );
  }
  if (menutype === MenuType.USAGI) {
    return (
      <div>
        <h1>mozukuの地図</h1>
        <Map apiKey={apiKey!} center={center} zoom={zoom} />
      </div>
    );
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
