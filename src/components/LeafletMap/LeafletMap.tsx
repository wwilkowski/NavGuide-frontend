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
  console.log('OTRZYMANE TRIPY: ', props.trips);
  return (
    <Map center={{ lat: latitude, lng: longitude }} zoom={15} style={{ height: '400px' }}>
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={{ lat: latitude, lng: longitude }}>
        <Popup>You</Popup>
      </Marker>
      {props.trips.map(trip => (
        <Marker position={{ lat: trip.lat + 0.0, lng: trip.lon + 0.0 }} color='red' />
      ))}
      <Circle center={{ lat: latitude, lng: longitude }} color='red' radius={radius * 100}>
        <Popup>Popup in CircleMarker</Popup>
      </Circle>
    </Map>
  );
};

export default LeafletMap;
