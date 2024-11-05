import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import FeedCard from '../card-feed/card-feed';

type MarkerInfo = {
  lat: number;
  lng: number;
  iconUrl?: string;
  infoText: string;
};

type MapWithInfoMarkerProps = {
  apiKey: string;
  center: { lat: number; lng: number };
  zoom: number;
  markers: MarkerInfo[];
};

const MapWithInfoMarker: React.FC<MapWithInfoMarkerProps> = ({ apiKey, center, zoom, markers }) => {
  const [selectedMarker, setSelectedMarker] = useState<MarkerInfo | null>(null);

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
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            // icon={{
            //   url: marker.iconUrl!,
            //   scaledSize: new google.maps.Size(30, 30), // アイコンのサイズを30x30ピクセルに調整
            // }}
            onClick={() => setSelectedMarker(marker)}
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div>
              <FeedCard title={'タイトル'} snipet={'Snipet'} encordedString={'encordedString'} pubData={'pubData'} link={'link'}></FeedCard>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapWithInfoMarker;
