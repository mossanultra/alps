"use client;";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import ResponsiveAppBar from "./components/appbar/appbar";
import RecipeReviewCard from "./components/card/card";
import TemporaryDrawer from "./components/drawer/drawer";
import AlignItemsList from "./components/list/list";
import CardList from "./components/cardList/cardList";
import Footer from "./components/footer/footer";
import FixedBottomNavigation, {
  MenuType,
} from "./components/buttomNavigation/buttonNavigation";
import { useState } from "react";

function Contents({ menutype }: { menutype: MenuType }) {
  if (menutype === MenuType.TIIKAWA) {
    return <CardList></CardList>;
  }
  if (menutype === MenuType.KURIMANJUU) {
    return <></>;
  }
  if (menutype === MenuType.HATIWARE) {
    return <></>;
  }
}

export default function Home() {
  const [menu, setMenu] = useState(MenuType.TIIKAWA);

  return (
    <div className={styles.container}>
      <Head>
        <title>ちいかわかわいすぎぃぃぃぃ</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#a8a6a3" />
      </Head>
      <TemporaryDrawer></TemporaryDrawer>
      <ResponsiveAppBar></ResponsiveAppBar>
      <Contents menutype={menu} />
      <FixedBottomNavigation
        onChangeMenu={function (menutype: MenuType): void {
          setMenu(menutype);
        }}
      ></FixedBottomNavigation>
      {/* <Footer></Footer> */}
      {/* <AlignItemsList></AlignItemsList> */}
    </div>
  );
}
