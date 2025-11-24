"use client"; // クライアントコンポーネントとして明示

import React, { ReactNode, useEffect, useRef, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useRouter } from "next/navigation";
import { useGeoLocation } from "@/features/geoLocation/hooks/useGeoLocation";
import { Point } from "@/features/point/types/point";
import { fetchPoints, registerPoint } from "@/features/point/hooks/usePoint";
import { useSession } from "next-auth/react";

type MapWithCustomModalMarkerProps = {
  zoom: number;
  children?: ReactNode;
};

const MapWithCustomModalMarker: React.FC<MapWithCustomModalMarkerProps> = ({
  zoom,
}) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const router = useRouter();
  const hasFetched = useRef(false);
  const { fetchLocation } = useGeoLocation();
  const [pointList, setPoints] = useState<Point[]>();
  const { data: session, status } = useSession();
  const [center, setCenter] = useState({ lat: 37.7608, lng: 140.473 });

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

  useEffect(() => {
    if (!hasFetched.current) {
      updateCurrentPosition();
      hasFetched.current = true;
    }
  }, []);

  useEffect(() => {
    const loadPoints = async () => {
      if (session?.user?.id) {
        const pointData = await fetchPoints(session.user.id);
        if (pointData) {
          setPoints(pointData);
        }
      }
    };
    loadPoints();
  }, [session]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>Not logged in</p>;
  }

  const containerStyle: React.CSSProperties = {
    width: "100%",
    height: "600px",
  };

  const handleMarkerClick = (marker: Point) => {
    router.push(`/points/${marker.id}`);
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
          const newPoints = await fetchPoints(session.user?.id);
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
        {pointList?.map((point, index) => renderMarker(point, index))}
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
