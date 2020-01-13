import React from 'react';
import { Map, Marker, Popup, TileLayer, Circle } from 'react-leaflet';
import * as types from './types';
import { ISingleTripType } from '../../containers/TripBrowser/types';

export interface Props {
  position: types.IPosition;
  trips: ISingleTripType[];
}

const LeafletMap = (props: Props) => {
  const { latitude, longitude, radius } = props.position;
  return (
    <Map center={{ lat: latitude, lng: longitude }} zoom={15} style={{ height: '550px' }}>
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={{ lat: latitude, lng: longitude }}>
        <Popup>You</Popup>
      </Marker>
      {props.trips.map(trip => (
        <Marker key={trip.name} position={{ lat: trip.lat, lng: trip.lon }}>
          <Popup>{trip.name}</Popup>
          <Circle center={{ lat: trip.lat, lng: trip.lon }} color='green' radius={trip.radius} />
        </Marker>
      ))}
      <Circle center={{ lat: latitude, lng: longitude }} color='red' radius={radius * 1000}>
        <Popup>Popup in CircleMarker</Popup>
      </Circle>
    </Map>
  );
};

export default LeafletMap;
