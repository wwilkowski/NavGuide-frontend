import React, { useState, useEffect } from 'react';
import TripListElement from '../TripBrowser/TripListElement';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../../containers/Offers/actions';
import { IProfileOffersProps, IOffer } from '../../containers/Offers/types';
import { showNotification } from '../../helpers/notification';
import { useTranslation } from 'react-i18next';

const OrderedOffers = ({ trips }: IProfileOffersProps) => {
  const { t } = useTranslation();
  const dispatcher = useDispatch();

  const [message, setMessage] = useState<string>('');
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

  const acceptOffer = (tripId: number) => {
    if (message) dispatcher(actions.settleActiveOfferRequest(tripId, 'ACCEPT', message));
    else showNotification('warning', t('Form error'), t('Message is required') + '!');
  };

  const rejectOffer = (tripId: number) => {
    if (message) dispatcher(actions.settleActiveOfferRequest(tripId, 'REJECT', message));
    else showNotification('warning', t('Form error'), t('Message is required') + '!');
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
          <Link to={`/users/${trip.traveler.id}`}>Zobacz profil użytkownika o id {trip.traveler.id}</Link>
          <textarea value={message} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)} />
          <button onClick={() => acceptOffer(trip.id)}>Zaakceptuj</button>
          <button onClick={() => rejectOffer(trip.id)}>Odrzuć</button>
        </li>
      ))}
    </ul>
  ) : null;
};

//FORMIK!

export default OrderedOffers;
