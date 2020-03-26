import React, { useEffect, useState } from 'react';
import TripListElement from '../../TripBrowser/TripListElement';
import { IOffer, IProfileOffersProps } from '../../../containers/Offers/types';
import { useTranslation } from 'react-i18next';

const OrderedOffers = ({ trips }: IProfileOffersProps) => {
  const { t } = useTranslation();

  const [filteredTrips, setFilteredTrips] = useState<IOffer[]>([]);

  useEffect(() => {
    if (trips) setFilteredTrips(trips.filter((trip: IOffer) => trip.status === 'PENDING'));
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
          <p>
            <b>{t('Planned date')}:</b> {getDate(trip.plannedDate)}
          </p>
          <TripListElement trip={trip.offer} />
          <p>
            <b>{t('Message')}:</b>
          </p>
          <p>{trip.message}</p>
        </li>
      ))}
    </ul>
  ) : null;
};

export default OrderedOffers;
