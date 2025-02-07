"use client"; // クライアントコンポーネントとして明示

import React, { ReactNode, useEffect, useRef, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useRouter } from "next/navigation";
import { useGeoLocation } from "@/features/geoLocation/hooks/useGeoLocation";
import { Point } from "@/features/point/types/point";
import { fetchPoints, registerPoint } from "@/features/point/hooks/usePoint";

type MapWithCustomModalMarkerProps = {
  zoom: number;
  userId: string;
  points: Point[];
  children?: ReactNode;
};

const MapWithCustomModalMarker: React.FC<MapWithCustomModalMarkerProps> = ({
  zoom,
  points,
}) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "", // .env に APIキーを設定
  });

  const router = useRouter();
  const hasFetched = useRef(false);
  const { fetchLocation } = useGeoLocation();
  const [pointList, setPoints] = useState<Point[]>(points);

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
      hasFetched.current = true;
    }
  }, []);

  const updateCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.error("Failed to get current position:", error)
      );
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
          const newPoints = await fetchPoints();
          setPoints(newPoints);
        }
      } catch (error) {
        console.error("Failed to handle map click:", error);
      }
    }
  };

  if (loadError) return <p>Error loading maps</p>;
  if (!isLoaded) return <p>Loading maps...</p>;

  return (
    <>
      <p>Select Map Style</p>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onClick={handleMapClick}
      >
        {pointList.map((point, index) => renderMarker(point, index))}
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
