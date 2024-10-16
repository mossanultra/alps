"use client;";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import ResponsiveAppBar from "./components/appbar/appbar";
import TemporaryDrawer from "./components/drawer/drawer";
import CardList from "./components/cardList/cardList";
import FixedBottomNavigation, {
  MenuType,
} from "./components/buttomNavigation/buttonNavigation";
import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Otokoume from "./components/otokoume/otokoume";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#d87274",
      light: "#ffa2a3",
      dark: "#a34449",
    },
  },
});

function Contents({ menutype }: { menutype: MenuType }) {
  if (menutype === MenuType.TIIKAWA) {
    return <CardList></CardList>;
  }
  if (menutype === MenuType.HATIWARE) {
    return <Otokoume></Otokoume>;
  }
  if (menutype === MenuType.KURIMANJUU) {
    return <></>;
  }
}

export default function Home() {
  const [menu, setMenu] = useState(MenuType.TIIKAWA);

  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}
