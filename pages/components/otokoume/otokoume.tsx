import classes from "./otokoume.module.css";
import HoloEffectCard from "../holocard/holoEffectCard";

export default function Otokoume() {
  return (
    <HoloEffectCard
      image={"otokoume.jpg"}
      position={[0, 0, 0]}
      className={classes.canvas}
      enableOrbitContorls={true}
    ></HoloEffectCard>
  );
}
