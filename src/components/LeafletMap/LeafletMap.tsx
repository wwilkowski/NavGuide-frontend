import React from 'react';
import { Map, Marker, Popup, TileLayer, Circle } from 'react-leaflet';
import * as types from './types';
import { ISingleTripType } from '../../containers/TripBrowser/types';
import L from 'leaflet';

export interface Props {
  position: types.IPosition;
  trips: ISingleTripType[];
  chosenOfferId: number | null;
  setChosenOfferId: (offerId: number) => void;
}

var customIcon = new L.Icon({
  iconUrl: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/marker-155-684987.png',
  iconSize: [41, 51],
  iconAnchor: [20, 51],
  popupAnchor: [0, -51]
});

const LeafletMap = ({ position, trips = [], chosenOfferId = null, setChosenOfferId }: Props) => {
  const { latitude, longitude, radius } = position;
  return (
    <Map center={{ lat: latitude, lng: longitude }} zoom={13} style={{ height: '550px', zIndex: 1, width: '600px' }}>
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={{ lat: latitude, lng: longitude }} icon={customIcon} opacity={0.5}>
        <Popup>You</Popup>
      </Marker>
      {trips.map(trip => (
        <Marker
          key={trip.name}
          position={{ lat: trip.lat, lng: trip.lon }}
          opacity={trip.id === chosenOfferId ? 1 : 0.5}
          onMouseOver={() => setChosenOfferId(trip.id)}
        >
          <Popup>{trip.name}</Popup>
          <Circle
            center={{ lat: trip.lat, lng: trip.lon }}
            color={'#fff53d'}
            opacity={trip.id === chosenOfferId ? 1 : 0.5}
            radius={trip.radius}
          />
        </Marker>
      ))}
      <Circle center={{ lat: latitude, lng: longitude }} color='#111111' radius={radius * 1000} opacity={0.1}>
        <Popup>Popup in CircleMarker</Popup>
      </Circle>
    </Map>
  );
};

export default LeafletMap;
