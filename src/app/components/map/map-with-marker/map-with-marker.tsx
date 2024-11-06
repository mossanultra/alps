import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

type MapWithMarkerProps = {
  apiKey: string;
  center: { lat: number; lng: number };
  zoom: number;
  markers: { lat: number; lng: number }[]; // マーカーの位置情報を配列で受け取る
};

const MapWithMarker: React.FC<MapWithMarkerProps> = ({ center, zoom, markers }) => {
  const containerStyle: React.CSSProperties = {
    width: '100%',
    height: '400px',
  };

  return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
      >
        {markers.map((position, index) => (
          <Marker key={index} position={position} />
        ))}
      </GoogleMap>
  );
};

export default MapWithMarker;
