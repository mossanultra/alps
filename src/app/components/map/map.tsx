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
import { useGeoLocation } from "@/hooks/useGeoLocation";
import { Point } from "@/app/api/points/route";
import { useAuthContext } from "@/app/context/AuthContext";

const googleMapStyles = [
  { label: "Zisla01", style: Zisla01 },
  { label: "GreenMap", style: GreenMap },
  { label: "AssassingsCreed", style: AssassingsCreed },
  { label: "Modest", style: Modest },
  { label: "Pinky", style: Pinky },
];

type MapWithCustomModalMarkerProps = {
  zoom: number;
  children?: ReactNode;
};

const MapWithCustomModalMarker: React.FC<MapWithCustomModalMarkerProps> = ({
  zoom,
}) => {
  const [selectedStyle, setSelectedStyle] = useState(googleMapStyles[0].style);
  const router = useRouter();
  const { registerPoint, fetchPoints, points } = usePoint();
  const hasFetched = useRef(false);
  const { fetchLocation } = useGeoLocation();
  const { userId } = useAuthContext();

  const containerStyle: React.CSSProperties = {
    width: "100%",
    height: "600px",
  };

  const [center, setCenter] = useState({ lat: 37.7608, lng: 140.473 });

  const handleMarkerClick = (marker: Point) => {
    router.push(`/points/${marker.id}`);
  };

  useEffect(() => {
    if (!hasFetched.current) {
      updateCurrentPosition();
      if (userId) {
        fetchPoints(userId).catch((error) =>
          console.error("Failed to fetch points:", error)
        );
      } else {
        fetchPoints().catch((error) =>
          console.error("Failed to fetch points:", error)
        );
      }
      hasFetched.current = true;
    }
  }, [fetchPoints, userId]);

  const updateCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCenter(pos);
        },
        (error) => console.error("Failed to get current position:", error)
      );
    }
  };

  const handleStyleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = googleMapStyles.find(
      (style) => style.label === event.target.value
    );
    if (selected) {
      setSelectedStyle(selected.style);
    }
  };

  const handleMapClick = async (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      try {
        const geoLocation = await fetchLocation(lat, lng);
        const isConfirmed = window.confirm(
          `${geoLocation?.city},${geoLocation?.town}にピンを立てますか？`
        );
        if (isConfirmed) {
          await registerPoint(lat, lng);
          fetchPoints();
        }
      } catch (error) {
        console.error("Failed to handle map click:", error);
      }
    }
  };

  const renderMarker = (point: Point, index: number) => {
    const icon = point.read
      ? undefined
      : {
          url: "/ma-motto.jpeg",
          scaledSize: new google.maps.Size(30, 30),
        };
    return (
      <Marker
        key={index}
        position={{ lat: point.lat, lng: point.lng }}
        icon={icon}
        onClick={() => handleMarkerClick(point)}
      />
    );
  };

  if (!points) {
    return <HamstarLoader />;
  }

  return (
    <>
      <p>Select Map Style</p>
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
      >
        {points.map((point, index) => renderMarker(point, index))}
        <Marker
          position={center}
          icon={{
            url: "/36959.png",
            scaledSize: new google.maps.Size(30, 30),
          }}
        />
      </GoogleMap>
    </>
  );
};

export default MapWithCustomModalMarker;
