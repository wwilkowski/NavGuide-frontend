import React from 'react';
import { Map, Marker, Popup, TileLayer, Circle } from 'react-leaflet';
import * as types from './types';
import { ISingleTripType } from '../../containers/TripBrowser/types';
import L from 'leaflet';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

export interface Props {
  position: types.IPosition;
  trips: ISingleTripType[];
  chosenOfferId: number | null;
  setChosenOfferId: (offerId: number) => void;
  height: string;
}

const useStyles = makeStyles({
  map: {
    height: '100vh',
    width: '100vw',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 0,
    '@media (min-width:900px)': {
      width: '50vw',
      height: '90vh',
      position: 'relative',
    },
  },
  marker: {
    borderRadius: '50%',
    border: '1px solid #000000',
    boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.75)',
  },
});

const LeafletMap = ({ position, trips = [], chosenOfferId = null, setChosenOfferId, height }: Props) => {
  const { latitude, longitude, radius } = position;

  const classes = useStyles();

  const createIcon = (source: string) => {
    return new L.Icon({
      iconUrl: source,
      iconSize: [40, 40],
      iconAnchor: [20, 51],
      popupAnchor: [0, -51],
      className: classes.marker,
    });
  };

  return (
    <Map center={{ lat: latitude, lng: longitude }} zoom={14} className={classes.map} style={{ height: height }}>
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={{ lat: latitude, lng: longitude }}>
        <Popup>You</Popup>
      </Marker>
      {trips.map((trip) => (
        <Marker
          key={trip.name}
          position={{ lat: trip.lat, lng: trip.lon }}
          onMouseOver={() => setChosenOfferId(trip.id)}
          // icon={createIcon(trip.photos[0])}
        >
          <Popup>
            <img src={trip.photos[0]} alt='' />
            <Link to={`offers/${trip.id}`}>{trip.name}</Link>
          </Popup>
          <Circle
            center={{ lat: trip.lat, lng: trip.lon }}
            color={'#303F9F'}
            opacity={trip.id === chosenOfferId ? 0.3 : 0}
            radius={trip.radius}
          />
        </Marker>
      ))}
      <Circle center={{ lat: latitude, lng: longitude }} color='#111111' radius={radius * 1000} opacity={0.05}>
        <Popup>Popup in CircleMarker</Popup>
      </Circle>
    </Map>
  );
};

export default LeafletMap;
