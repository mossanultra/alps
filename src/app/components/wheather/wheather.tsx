import React, { useCallback, useEffect, useState } from "react";
import HamstarLoader from "../loading/hamster/hamster";
import { WeatherResponse } from "./wheathre";

interface ExpandMoreProps {
  city: string;
}

export default function Wheather(props: ExpandMoreProps) {
  const [wheather, setWheather] = useState<WeatherResponse>();
  const [isLoading, setIsLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false); // New state for fade-in

  const loadWheather = useCallback(async (city: string) => {
    if (!city) return;
    setIsLoading(true); // Reset loading state when city changes
    const response = await fetch(
      `https://weather.tsukumijima.net/api/forecast/city/${city}`
    );
    const json = await response.json();
    const wheather: WeatherResponse = JSON.parse(JSON.stringify(json));
    setWheather(wheather);
    setIsLoading(false);

    setTimeout(() => setFadeIn(true), 100); // Trigger fade-in after loading
  }, []);

  useEffect(() => {
    setFadeIn(false); // Reset fade-in before loading new data
    loadWheather(props.city); // Trigger data reload when props.city changes
  }, [props.city, loadWheather]);

  if (isLoading) {
    return <HamstarLoader />;
  }

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        maxWidth: "600px",
        opacity: fadeIn ? 1 : 0, // Apply fade-in effect
        transition: "opacity 1s ease-in-out", // Smooth transition
      }}
    >
      <h1>{wheather!.title}</h1>
      <p>
        地域: {wheather!.location.city}, {wheather!.location.prefecture},{" "}
        {wheather!.location.area}
      </p>
      <p>発表時刻: {wheather!.publicTimeFormatted}</p>
      <p>{wheather!.description.headlineText}</p>
      <p>{wheather!.description.bodyText}</p>

      <h2>天気予報</h2>
      <div>
        {wheather!.forecasts.map((forecast, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            <h3>
              {forecast.dateLabel} ({forecast.date})
            </h3>
            <img
              src={forecast.image.url}
              alt={forecast.image.title}
              width={forecast.image.width}
              height={forecast.image.height}
            />
            <p>{forecast.telop}</p>
            <p>天気: {forecast.detail.weather}</p>
            <p>風: {forecast.detail.wind}</p>
            <p>波: {forecast.detail.wave}</p>
            <p>
              最高気温: {forecast.temperature.max.celsius ?? "N/A"}℃
            </p>
            <p>
              最低気温: {forecast.temperature.min.celsius ?? "N/A"}℃
            </p>
            <p>降水確率:</p>
            <ul>
              <li>00-06時: {forecast.chanceOfRain.T00_06}</li>
              <li>06-12時: {forecast.chanceOfRain.T06_12}</li>
              <li>12-18時: {forecast.chanceOfRain.T12_18}</li>
              <li>18-24時: {forecast.chanceOfRain.T18_24}</li>
            </ul>
          </div>
        ))}
      </div>

      <footer
        style={{
          marginTop: "20px",
          borderTop: "1px solid #ddd",
          paddingTop: "10px",
        }}
      >
        <p>情報提供: {wheather!.publishingOffice}</p>
        <a href={wheather!.copyright.link}>
          <img
            src={wheather!.copyright.image.url}
            alt={wheather!.copyright.image.title}
            width={wheather!.copyright.image.width}
            height={wheather!.copyright.image.height}
          />
        </a>
        <p>{wheather!.copyright.title}</p>
      </footer>
    </div>
  );
}
