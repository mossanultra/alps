import React, { ReactNode, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import ModalDialog from "./modal-modal/modal-dialog";
import Image from "next/image";
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
  iconUrl?: string;
  infoTitle: string;
  infoContent: string;
  image: string;
};

type MapWithCustomModalMarkerProps = {
  center: { lat: number; lng: number };
  zoom: number;
  markers: MarkerInfo[];
  children?: ReactNode;
};

const MapWithCustomModalMarker: React.FC<MapWithCustomModalMarkerProps> = ({
  center,
  zoom,
  markers,
  children,
}) => {
  const [selectedMarker, setSelectedMarker] = useState<MarkerInfo | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState(googleMapStyles[0].style);

  const containerStyle: React.CSSProperties = {
    width: "100%",
    height: "600px",
  };

  const handleMarkerClick = (marker: MarkerInfo) => {
    setSelectedMarker(marker);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedMarker(null);
    setModalOpen(false);
  };

  const handleStyleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = googleMapStyles.find(
      (style) => style.label === event.target.value
    );
    if (selected) {
      setSelectedStyle(selected.style);
    }
  };

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
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => handleMarkerClick(marker)}
            />
          ))}

          {/* モーダルダイアログ */}
          {isModalOpen && selectedMarker && (
            <ModalDialog onClose={handleCloseModal}>
              {children ? (
                children
              ) : (
                <div
                  style={{
                    position: "relative",
                    width: "300px",
                    height: "300px",
                  }}
                >
                  <Image
                    src={selectedMarker.image}
                    alt=""
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              )}
            </ModalDialog>
          )}
        </GoogleMap>
    </>
  );
};

export default MapWithCustomModalMarker;
