import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

type MapProps = {
  apiKey: string;
  center: { lat: number; lng: number };
  zoom: number;
};

const Map: React.FC<MapProps> = ({ apiKey, center, zoom }) => {
  const containerStyle: React.CSSProperties = {
    width: '100%',
    height: '800px',
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
      />
    </LoadScript>
  );
};

export default Map;
