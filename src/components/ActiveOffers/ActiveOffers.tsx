import React from 'react';
import { ISingleTripType } from '../../containers/TripBrowser/types';
import TripListElement from '../TripBrowser/TripListElement';

interface ITraveler {
  id: number;
  firstName: string;
  lastName: string;
  country: string;
  role: string;
  experience: number;
  avatar: string;
}

interface IActiveOffer {
  id: number;
  message: string;
  offer: ISingleTripType;
  plannedDate: Date;
  traveler: ITraveler;
}

interface Props {
  trips: IActiveOffer[];
}

const OrderedOffers = ({ trips }: Props) => {
  return trips && trips.length ? (
    <ul>
      {trips.map((trip, i) => (
        <li key={i}>
          <TripListElement trip={trip.offer} changeVisible={() => {}} />
          <p>Wiadomość od turysty</p>
          <p>{trip.message}</p>
          <p>Planowana data</p>
          <p>{trip.plannedDate}</p>
        </li>
      ))}
    </ul>
  ) : null;
};

export default OrderedOffers;
