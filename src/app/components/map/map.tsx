import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import ModalDialog from './modal-modal/modal-dialog';

type MarkerInfo = {
  lat: number;
  lng: number;
  iconUrl?: string;
  infoTitle: string;
  infoContent: string;
};

type MapWithCustomModalMarkerProps = {
  apiKey: string;
  center: { lat: number; lng: number };
  zoom: number;
  markers: MarkerInfo[];
};

const MapWithCustomModalMarker: React.FC<MapWithCustomModalMarkerProps> = ({ apiKey, center, zoom, markers }) => {
  const [selectedMarker, setSelectedMarker] = useState<MarkerInfo | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const containerStyle: React.CSSProperties = {
    width: '100%',
    height: '800px',
  };

  const handleMarkerClick = (marker: MarkerInfo) => {
    setSelectedMarker(marker);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedMarker(null);
    setModalOpen(false);
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            // icon={{
            //   url: marker.iconUrl,
            //   scaledSize: new google.maps.Size(30, 30),
            // }}
            onClick={() => handleMarkerClick(marker)}
          />
        ))}

        {/* モーダルダイアログ */}
        {isModalOpen && selectedMarker && (
          <ModalDialog onClose={handleCloseModal}>
            <h2>{selectedMarker.infoTitle}</h2>
            <p>{selectedMarker.infoContent}</p>
          </ModalDialog>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapWithCustomModalMarker;
