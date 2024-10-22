"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import HamstarLoader from "../../loading/hamster/hamster";

export default function WheatherPage() {
  const [jsonString, setJsonString] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // useParamsでURLパラメータを取得
  const { city } = useParams();

  const loadWheather = useCallback(async (city: string) => {
    if (!city) return;
    const response = await fetch(`https://weather.tsukumijima.net/api/forecast/${city}`);
    const json = await response.json();
    setJsonString(json);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadWheather(city as string); // useParamsで取得したarticleIdを使用
  }, [loadWheather, city]);

  if (isLoading) {
    return <HamstarLoader />;
  }

  return <div>{jsonString}</div>;
}
