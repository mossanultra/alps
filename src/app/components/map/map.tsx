import React, { ReactNode, useState, useRef, useEffect, useMemo } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useRouter } from "next/navigation";
import { usePoint } from "@/hooks/usePoint";
import { Zisla01 } from "./style/zisla01";
import { GreenMap } from "./style/greeenmap";
import { AssassingsCreed } from "./style/assassins-creed";
import { Modest } from "./style/modest";
import { Pinky } from "./style/pinky";

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

type MapProps = {
  center: { lat: number; lng: number };
  zoom: number;
  children?: ReactNode;
  onPointRegisterd?: () => void;
};

const MapWithCustomModalMarker: React.FC<MapProps> = ({
  center,
  zoom,
  onPointRegisterd,
}) => {
  const [mapState, setMapState] = useState({
    center,
    zoom,
  });
  const [selectedStyle, setSelectedStyle] = useState(googleMapStyles[0].style);
  const mapRef = useRef<google.maps.Map | null>(null);
  const router = useRouter();
  const { registerPoint, fetchPoints, points } = usePoint();

  const containerStyle: React.CSSProperties = {
    width: "100%",
    height: "600px",
  };

  const mapStylesOptions = useMemo(() => googleMapStyles, []);

  useEffect(() => {
    fetchPoints();
  }, [fetchPoints]);

  const handleMarkerClick = (marker: MarkerInfo) => {
    router.push(`/points/${marker.id}`);
  };

  const handleStyleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = mapStylesOptions.find(
      (style) => style.label === event.target.value
    );
    if (selected) setSelectedStyle(selected.style);
  };

  const handleMapClick = async (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      console.log("Clicked location:", { lat, lng });
      await registerPoint(lat, lng);
      if (onPointRegisterd) onPointRegisterd();
      fetchPoints();
    }
  };

  const handleCenterChanged = () => {
    if (mapRef.current) {
      const newCenter = mapRef.current.getCenter();
      if (newCenter) {
        const lat = newCenter.lat();
        const lng = newCenter.lng();

        setMapState((prev) => ({
          ...prev,
          center: { lat, lng },
        }));
      }
    }
  };

  const handleZoomChanged = () => {
    if (mapRef.current) {
      const newZoom = mapRef.current.getZoom();
      if (newZoom) {
        setMapState((prev) => ({
          ...prev,
          zoom: newZoom,
        }));
      }
    }
  };

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  const onUnmount = () => {
    mapRef.current = null;
  };

  return (
    <>
      <p>Select Map Style</p>
      <select onChange={handleStyleChange}>
        {mapStylesOptions.map((style, index) => (
          <option key={index} value={style.label}>
            {style.label}
          </option>
        ))}
      </select>
      <p>Current Zoom: {mapState.zoom}</p>
      <p>
        Current Center: Latitude {mapState.center.lat}, Longitude{" "}
        {mapState.center.lng}
      </p>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapState.center}
        zoom={mapState.zoom}
        options={{ styles: selectedStyle }}
        onClick={handleMapClick}
        onZoomChanged={handleZoomChanged}
        onCenterChanged={handleCenterChanged}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {points.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => handleMarkerClick(marker)}
          />
        ))}
      </GoogleMap>
    </>
  );
};

export default MapWithCustomModalMarker;
