import React from 'react';
import { ISingleTripType } from '../../containers/Offers/types';
// import TripListElement from '../TripBrowser/TripListElement';

interface Props {
  trips: ISingleTripType[];
}

const OrderedOffers = ({ trips }: Props) => {
  return trips && trips.length ? (
    <ul>
      {trips.map((trip, i) => (
        <li key={i}>{/* <TripListElement trip={trip} changeVisible={() => {}} /> */}</li>
      ))}
    </ul>
  ) : null;
};

export default OrderedOffers;
