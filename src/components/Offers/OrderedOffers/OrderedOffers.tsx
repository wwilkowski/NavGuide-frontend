import React, { useState, useEffect } from 'react';
import TripListElement from '../../TripBrowser/TripListElement';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../../../containers/Offers/actions';
import { IProfileOffersProps, IOffer } from '../../../containers/Offers/types';
import { showNotification } from '../../../helpers/notification';
import { useTranslation } from 'react-i18next';
import history from '../../../history';

const OrderedOffers = ({ trips, agreements }: IProfileOffersProps) => {
  const { t } = useTranslation();

  const dispatcher = useDispatch();

  const [message, setMessage] = useState<string>('');
  const [filteredTrips, setFilteredTrips] = useState<IOffer[]>([]);
  const [agreementsTrips] = useState<IOffer[]>([]);

  useEffect(() => {
    if (trips) setFilteredTrips(trips.filter((trip: IOffer) => trip.status === 'PENDING'));
  }, [trips]);

  const getDate = (date: Date) => {
    return date
      .toString()
      .replace('T', ' ')
      .substr(0, date.toString().indexOf('.'));
  };

  const acceptOffer = (tripId: number) => {
    if (message) {
      dispatcher(actions.settleActiveOfferRequest(tripId, 'ACCEPT', message));
    } else showNotification('warning', t('Form error'), t('Message is required') + '!');
  };

  const rejectOffer = (tripId: number) => {
    if (message) dispatcher(actions.settleActiveOfferRequest(tripId, 'REJECT', message));
    else showNotification('warning', t('Form error'), t('Message is required') + '!');
  };

  /*
  const checkIfActiveOfferInAgreements = (offerId: number) => {
    if (agreements) {
      agreements.forEach((agr: IAgreementOffer) => {
        console.log(agr.offer.id);
        if (agr.offer.id === offerId) {
          return false;
        }
      });
    }
    return true;
  };*/

  return filteredTrips && filteredTrips.length ? (
    <ul>
      {agreementsTrips.map((trip: IOffer, i: number) => (
        <li key={i}>
          <p>{trip.plannedDate}</p>
          <button
            onClick={() =>
              history.push('/agreement/create', { pathFrom: '/profile/guide', offerId: trip.offer.id, travelerId: trip.traveler.id })
            }
          >
            {t('Create agreement')}
          </button>
        </li>
      ))}
      {filteredTrips.map((trip: IOffer, i: number) => (
        <li key={i}>
          <TripListElement trip={trip.offer} />
          <p>Wiadomość od turysty</p>
          <p>{trip.message}</p>
          <p>Planowana data: {getDate(trip.plannedDate)}</p>
          <Link to={`/users/${trip.traveler.id}`}>
            {t('Check user profile with ID')} {trip.traveler.id}
          </Link>
          <textarea value={message} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)} />
          <Link
            to={
              message
                ? {
                    pathname: `/agreement/create/${trip.traveler.id}/${trip.offer.id}`,
                    state: {
                      pathFrom: '/profile/guide',
                      offerId: trip.offer.id,
                      travelerId: trip.traveler.id
                    }
                  }
                : '/profile/guide'
            }
          >
            <button
              onClick={() => {
                acceptOffer(trip.id);
              }}
            >
              Zaakceptuj
            </button>
          </Link>
          <button onClick={() => rejectOffer(trip.id)}>Odrzuć</button>
        </li>
      ))}
    </ul>
  ) : null;
};

//FORMIK!

export default OrderedOffers;
