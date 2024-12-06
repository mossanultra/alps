import React, { ReactNode, useEffect, useRef, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { Zisla01 } from "./style/zisla01";
import { GreenMap } from "./style/greeenmap";
import { AssassingsCreed } from "./style/assassins-creed";
import { Modest } from "./style/modest";
import { Pinky } from "./style/pinky";
import { useRouter } from "next/navigation";
import { usePoint } from "@/hooks/usePoint";
import HamstarLoader from "../loading/hamster/hamster";

const googleMapStyles = [
  { label: "Zisla01", style: Zisla01 },
  { label: "GreenMap", style: GreenMap },
  { label: "AssassingsCreed", style: AssassingsCreed },
  { label: "Modest", style: Modest },
  { label: "Pinky", style: Pinky },
];

type MarkerInfo = {
  lat: number;
  lng: number;
  id: string;
};

type MapWithCustomModalMarkerProps = {
  zoom: number;
  children?: ReactNode;
};

const MapWithCustomModalMarker: React.FC<MapWithCustomModalMarkerProps> = ({
  zoom,
}) => {
  const [selectedStyle, setSelectedStyle] = useState(googleMapStyles[0].style);
  const router = useRouter();
  const { registerPoint } = usePoint();
  const containerStyle: React.CSSProperties = {
    width: "100%",
    height: "600px",
  };
  const [center, setcenter] = useState({ lat: 37.7608, lng: 140.473 });
  const { fetchPoints, points } = usePoint();
  const hasFetched = useRef(false);

  const handleMarkerClick = (marker: MarkerInfo) => {
    router.push(`/points/${marker.id}`);
  };
  useEffect(() => {
    if (!hasFetched.current) {
      updateCurrentPosition();
      console.log("?????");
      const fetchData = async () => {
        await fetchPoints();
      };
      fetchData();
      hasFetched.current = true;
    }
  }, []);

  const updateCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setcenter(pos);
        },
        () => {}
      );
    }
  };
  const handleStyleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = googleMapStyles.find(
      (style) => style.label === event.target.value
    );
    if (selected) {
      setSelectedStyle(selected.style);
      const lat = center.lat + 1;
      setcenter({ lat: lat, lng: center.lng });
      console.log(lat);
    }
  };
  const handleMapClick = async (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      console.log("Clicked location:", { lat, lng });
      // ここでポイントが追加されてる
      await registerPoint(lat, lng);
    }
  };
  const handleZoomChanged = () => {
    // setZoom(map.getZoom());
  };
  if (!points) {
    return <HamstarLoader />;
  }

  return (
    <>
      {/* ドロップダウンボックス */}
      <p>Selecte Map Style</p>
      <select onChange={handleStyleChange}>
        {googleMapStyles.map((style, index) => (
          <option key={index} value={style.label}>
            {style.label}
          </option>
        ))}
      </select>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        options={{ styles: selectedStyle }}
        onClick={handleMapClick}
        onZoomChanged={handleZoomChanged}
      >
        {points.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => handleMarkerClick(marker)}
          />
        ))}
        <Marker
          position={{ lat: center.lat, lng: center.lng }}
          icon={{
            url: "/otokoume.jpg", // publicディレクトリから画像を参照
            scaledSize: new google.maps.Size(50, 50), // サイズを調整
          }}
        />
      </GoogleMap>
    </>
  );
};

export default MapWithCustomModalMarker;
