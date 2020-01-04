import React from 'react';
import { Map, Marker, Popup, TileLayer, CircleMarker } from 'react-leaflet';

interface Props {
  radius: number;
}

const OffersMap = ({ radius }: Props) => {
  const latlng = {
    lat: 53.01023065,
    lng: 18.594376006630313
  };
  return (
    <Map center={latlng} zoom={17} style={{ height: '400px' }}>
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={latlng}>
        <Popup>
          A pretty CSS3 popup.
          <br />
          Easily customizable.
        </Popup>
      </Marker>
      <CircleMarker center={latlng} color='red' radius={radius}>
        <Popup>Popup in CircleMarker</Popup>
      </CircleMarker>
    </Map>
  );
};

export default OffersMap;
