import React, { ReactNode, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
// import ModalDialog from "./modal-modal/modal-dialog";
// import Image from "next/image";
import { Zisla01 } from "./style/zisla01";
import { GreenMap } from "./style/greeenmap";
import { AssassingsCreed } from "./style/assassins-creed";
import { Modest } from "./style/modest";
import { Pinky } from "./style/pinky";
// import ChatThread from "./chatthread/chatthread";
// import styles from "./map.module.css";
import { useRouter } from "next/navigation";
import { usePoint } from "@/hooks/usePoint";

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
  // iconUrl?: string;
  // infoTitle: string;
  // infoContent: string;
  // image: string;
  id: string;
};

type MapWithCustomModalMarkerProps = {
  zoom: number;
  markers: MarkerInfo[];
  children?: ReactNode;
  onPointRegisterd: () => void;
};

const MapWithCustomModalMarker: React.FC<MapWithCustomModalMarkerProps> = ({
  zoom,
  markers,
  onPointRegisterd,
}) => {
  // const [selectedMarker, setSelectedMarker] = useState<MarkerInfo | null>(null);
  // const [isModalOpen, setModalOpen] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState(googleMapStyles[0].style);
  const router = useRouter();
  const { registerPoint } = usePoint();
  const containerStyle: React.CSSProperties = {
    width: "100%",
    height: "600px",
  };
  const [center, setcenter] = useState({ lat: 37.7608, lng: 140.473 });

  const handleMarkerClick = (marker: MarkerInfo) => {
    router.push(`/points/${marker.id}`);
  };

  const handleStyleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = googleMapStyles.find(
      (style) => style.label === event.target.value
    );
    if (selected) {
      setSelectedStyle(selected.style);
      const  lat=center.lat+1;
      setcenter({lat:lat,lng:center.lng})
      console.log(lat)
    }
  };
  const handleMapClick = async (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      console.log("Clicked location:", { lat, lng });
      // ここでポイントが追加されてる
      await registerPoint(lat, lng);

      // リロードする
      onPointRegisterd();
    }
  };
  const handleZoomChanged = () => {
    // setZoom(map.getZoom());
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
        onClick={handleMapClick}
        onZoomChanged={handleZoomChanged}

      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => handleMarkerClick(marker)}
          />
        ))}

        {/* モーダルダイアログ
        {isModalOpen && selectedMarker && (
          <ModalDialog onClose={handleCloseModal}>
            {children ? (
              children
            ) : (
              <div
                // style={{
                //   position: "relative",
                //   width: "300px",
                //   height: "300px",
                // }}
                className={styles.container}
              >
                <p style={{color: 'black'}}>ここで陶芸体験ができたよ！！</p>
                <Image
                  src={'/tougei.jpg'}
                  alt=""
                  layout="fill"
                  objectFit="contain"
                />
                <ChatThread messages={[{
                  text: 'シロをいけにえに！！',
                  timestamp: Date().toString(),
                  isSender: false
                }]}></ChatThread>

              </div>
            )}
          </ModalDialog>
        )} */}
      </GoogleMap>
    </>
  );
};

export default MapWithCustomModalMarker;
