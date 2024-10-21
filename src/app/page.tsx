"use client";
import ResponsiveAppBar from "./components/appbar/appbar";
import CardList from "./components/cardList/cardList";
import FixedBottomNavigation, {
  MenuType,
} from "./components/buttomNavigation/buttonNavigation";
import { useState } from "react";
import Otokoume from "./components/otokoume/otokoume";
import MarkdownEditor from "./components/markdown-editor/editor";
// import { ThemeProvider, createTheme } from "@mui/material/styles";

// export const theme = createTheme({
//   palette: {
//     mode: "dark",
//     primary: {
//       main: "#d87274",
//       light: "#ffa2a3",
//       dark: "#a34449",
//     },
//   },
// });

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
  if (menutype === MenuType.MARMOT) {
    return <MarkdownEditor></MarkdownEditor>;
  }
}

export default function Home() {
  const [menu, setMenu] = useState(MenuType.TIIKAWA);

  return (
    <div>
      {/* <ThemeProvider theme={theme}> */}
        {/* <TemporaryDrawer></TemporaryDrawer> */}
        <ResponsiveAppBar></ResponsiveAppBar>
        <Contents menutype={menu} />
        <FixedBottomNavigation
          onChangeMenu={function (menutype: MenuType): void {
            setMenu(menutype);
          }}
        ></FixedBottomNavigation>
        {/* <Footer></Footer> */}
        {/* <AlignItemsList></AlignItemsList> */}
      {/* </ThemeProvider> */}
    </div>
  );
}
