import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";

interface FixedBottomNavigationProps {
  onChangeMenu: (menutype: MenuType) => void;
}

export enum MenuType {
  TIIKAWA,
  HATIWARE,
  KURIMANJUU,
  MARMOT
}

export default function FixedBottomNavigation(
  props: FixedBottomNavigationProps
) {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
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
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="ちいかわ"
            icon={
              <img
                src="/icon512_maskable.png"
                alt="ちいかわ"
                style={{ width: 24, height: 24 }}
              />
            }
          />
          <BottomNavigationAction
            label="はちわれ"
            icon={
              <img
                src="/hatiware.jpeg"
                alt="はちわれ"
                style={{ width: 24, height: 24 }}
              />
            }
          />
          <BottomNavigationAction
            label="栗まんじゅう"
            icon={
              <img
                src="/kurimanjuu.jpg"
                alt="栗まんじゅう"
                style={{ width: 24, height: 24 }}
              />
            }
          />
          <BottomNavigationAction
            label="もーまっと"
            icon={
              <img
                src="/ma-motto.jpeg"
                alt="もーまっと"
                style={{ width: 24, height: 24 }}
              />
            }
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
