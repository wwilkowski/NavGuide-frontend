import React, { useEffect, useState } from 'react';
import TripListElement from '../TripBrowser/TripListElement';
import { IOffer, IProfileHistoryOffersProps } from '../../containers/Offers/types';

const HistoryOffers = ({ trips, role }: IProfileHistoryOffersProps) => {
  const [filteredTrips, setFilteredTrips] = useState<IOffer[]>([]);

  useEffect(() => {
    if (trips) setFilteredTrips(trips.filter((trip: IOffer) => trip.status !== 'PENDING'));
  }, [trips]);

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
          <TripListElement trip={trip.offer} />
          <p>Status</p>
          <p>{trip.status}</p>
          <p>Wiadomość od turysty</p>
          <p>{trip.message}</p>
          <p>Odpowiedź</p>
          <p>{trip.feedbackMessage}</p>
          <p>Planowana data</p>
          <p>{getDate(trip.plannedDate)}</p>
        </li>
      ))}
    </ul>
  ) : null;
};

export default HistoryOffers;
