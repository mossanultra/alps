import React, { useCallback, useEffect, useState } from "react";
import HamstarLoader from "../loading/hamster/hamster";
// import styles from "./card-plane.module.css";

interface ExpandMoreProps {
  city: string;
}

export default function Wheather(props: ExpandMoreProps) {
  const [jsonString, setJsonString] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const loadWheather = useCallback(async (city: string) => {
    if (!city) return;
    const response = await fetch(
      `https://weather.tsukumijima.net/api/forecast/city/${city}`
    );
    const json = await response.json();
    console.log(json);
    setJsonString(json);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadWheather(props.city); // useParamsで取得したarticleIdを使用
  }, [loadWheather, props]);

  return (
    <div>
      {isLoading ? <HamstarLoader></HamstarLoader> : <div>{JSON.stringify(jsonString)}</div>}
    </div>
  );
}
