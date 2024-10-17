import classes from "./otokoume.module.css";
import HoloEffectCard from "../holocard/holoEffectCard";

export default function Otokoume() {
  return (
    <div className={classes.canvas_container}>
      <div className={classes.container}>
        <HoloEffectCard
          image={"otokoume.jpg"}
          position={[0, 0, 0]}
          className={classes.canvas}
          enableOrbitContorls={true}
        ></HoloEffectCard>
        <HoloEffectCard
          image={"china.jpg"}
          position={[0, 0, 0]}
          className={classes.canvas}
          enableOrbitContorls={true}
        ></HoloEffectCard>
      </div>
    </div>
  );
}
