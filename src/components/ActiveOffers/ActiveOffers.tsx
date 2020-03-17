import React, { useEffect, useState } from 'react';
import TripListElement from '../TripBrowser/TripListElement';
import { IOffer, IProfileOffersProps } from '../../containers/Offers/types';

const OrderedOffers = ({ trips }: IProfileOffersProps) => {
  const [filteredTrips, setFilteredTrips] = useState<IOffer[]>([]);

  useEffect(() => {
    if (trips)
      setFilteredTrips(
        trips.filter((trip: IOffer) => {
          if (trip.status === 'PENDING') return trip;
        })
      );
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
          <p>Wiadomość od turysty</p>
          <p>{trip.message}</p>
          <p>Planowana data</p>
          <p>{getDate(trip.plannedDate)}</p>
        </li>
      ))}
    </ul>
  ) : null;
};

export default OrderedOffers;
