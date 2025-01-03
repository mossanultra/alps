"use client";
import { useRef, useState, useEffect } from "react";
import PlaneAppBar from "./components/appbar-plane/plane-appbar";
import FixedBottomNavigation, {
  MenuType,
} from "./components/fixex-bottom-navigation/fixed-bottom-navigation";
import Wheather from "./components/wheather/wheather";
import RadioButton from "./components/radio-button/radio-button";
import TairaImage from "./components/tairaimage/taira-image";
// import Map from "./components/map/map";
import { LoadScript } from "@react-google-maps/api";
import Profile from "./components/profile/profile";
import PostForm from "./components/newpost/new-post";
import LoginPage from "./components/login/login";
import { useAuthContext } from "./context/AuthContext";
import NotificationToken from "./components/firebase/notifications";
// import Image from "next/image";

function Contents({ menutype }: { menutype: MenuType }) {
  const [selectCityId, setSelectCityId] = useState("017010");
  const { userId } = useAuthContext();

  if (menutype === MenuType.TIIKAWA) {
    return <TairaImage />;
  }
  if (menutype === MenuType.HATIWARE) {
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
  if (menutype === MenuType.KURIMANJUU) {
    return (
      <>
        <PostForm
          profileImage={
            "https://pbs.twimg.com/profile_images/1597336893019934720/o_byHBVW_400x400.jpg"
          }
          username={"もずく"}
          onPostCreated={function (): void {
            console.log("created");
          }}
        ></PostForm>
      </>
    );
  }
  if (menutype === MenuType.MARMOT) {
    return (
      <>
        <LoginPage></LoginPage>
      </>
    );
  }
  if (menutype === MenuType.USAGI) {
    return (
      <div>
        <Profile
          profileImage="https://pbs.twimg.com/profile_images/1597336893019934720/o_byHBVW_400x400.jpg"
          username="もずく"
          bio="筋肉エンジニア"
          followers={1200}
          following={300}
          userId={userId!}
        />
      </div>
    );
  }
}

export default function Home() {
  const [menu, setMenu] = useState(MenuType.TIIKAWA);
  const [appBarHeight, setAppBarHeight] = useState(0); // AppBarの高さを保存するstate
  const appBarRef = useRef<HTMLDivElement>(null); // AppBarの参照を保存するref
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY; // Google Maps APIキーをここに挿入

  // useEffectでAppBarの高さを取得
  useEffect(() => {
    if (appBarRef.current) {
      setAppBarHeight(appBarRef.current.clientHeight); // AppBarの高さを取得してstateに保存
    }
  }, []);

  return (
    <div>
      <LoadScript googleMapsApiKey={apiKey!}>
        {/* AppBarの参照をrefに渡す */}
        <div ref={appBarRef}>
          <PlaneAppBar />
        </div>
        <NotificationToken />

        {/* AppBarの高さに応じてpaddingTopを動的に設定 */}
        <div style={{ paddingTop: `${appBarHeight + 48}px` }}>
          <Contents menutype={menu} />
        </div>

        <FixedBottomNavigation
          onChangeMenu={(menutype: MenuType): void => {
            setMenu(menutype);
          }}
        />
      </LoadScript>
    </div>
  );
}
