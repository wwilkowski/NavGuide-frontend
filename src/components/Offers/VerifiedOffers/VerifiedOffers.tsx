import React, { useEffect, useState } from 'react';
import TripListElement from '../../TripBrowser/TripListElement';
import { IOffer, IProfileVerifiedOffersProps } from '../../../containers/Offers/types';
import { useLocation } from 'react-router-dom';

const VerifiedOffers = ({ trips, state }: IProfileVerifiedOffersProps) => {
  const [filteredTrips, setFilteredTrips] = useState<IOffer[]>([]);

  const location = useLocation();

  useEffect(() => {
    if (trips && state === 'accepted') {
      setFilteredTrips(trips.filter((trip: IOffer) => trip.status === 'ACCEPTED'));
    } else if (trips && state === 'rejected') {
      setFilteredTrips(trips.filter((trip: IOffer) => trip.status === 'REJECTED'));
    }
  }, [trips, state]);

  const getDate = (date: Date) => {
    return date
      .toString()
      .replace('T', ' ')
      .substr(0, date.toString().indexOf('.'));
  };

  return filteredTrips && filteredTrips.length ? (
    <ul>
      {filteredTrips.map((trip: IOffer, i: number) => (
        <li key={i}>
          <p>Planowana data: {getDate(trip.plannedDate)}</p>
          <TripListElement trip={trip.offer} />
          <p>Wiadomość od turysty</p>
          <p>{trip.message}</p>
          <p>Odpowiedź</p>
          <p>{trip.feedbackMessage}</p>
          {location.pathname === '/profile/guide' && <button>Sporządź umowę</button>}
        </li>
      ))}
    </ul>
  ) : null;
};

export default VerifiedOffers;
