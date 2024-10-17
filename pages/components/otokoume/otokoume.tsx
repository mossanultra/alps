import classes from "./otokoume.module.css";
import HoloEffectCard from "../holocard/holoEffectCard";
import { List, ListItem, Typography } from "@mui/material";

export default function Otokoume() {
  return (
    <div>
          <Typography variant="subtitle1">隠れミッキー（中国）もいるよ！！</Typography>

    <div className={classes.canvas_container}>
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        <ListItem alignItems="flex-start">
          <div className={classes.container}>
            <HoloEffectCard
              image={"otokoume.jpg"}
              position={[0, 0, 0]}
              className={classes.canvas}
              enableOrbitContorls={true}
            ></HoloEffectCard>
          </div>
        </ListItem>
        <ListItem alignItems="flex-start">
          <div className={classes.container}>
            <HoloEffectCard
              image={"china.jpg"}
              position={[0, 0, 0]}
              className={classes.canvas}
              enableOrbitContorls={true}
            ></HoloEffectCard>
          </div>
        </ListItem>
      </List>
    </div>
    </div>
  );
}
