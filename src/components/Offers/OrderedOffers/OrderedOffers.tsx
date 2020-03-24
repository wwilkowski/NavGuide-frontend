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

  // eslint-disable-next-line
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);
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

  const settleOffer = (tripId: number, status: string, messagesIndex: number) => {
    if (messages[messagesIndex]) dispatcher(actions.settleActiveOfferRequest(tripId, status, messages[messagesIndex]));
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
          <p>{t('Message from tourist')}:</p>
          <p>{trip.message}</p>
          <p>
            {t('Planned date')}: {getDate(trip.plannedDate)}
          </p>
          <Link to={`/users/${trip.traveler.id}`}>
            {t('Check user profile with ID')} {trip.traveler.id}
          </Link>
          <textarea
            value={messages[i]}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              let tmp = messages;
              tmp[i] = e.target.value;
              setMessages(tmp);
              setCurrentMessage(tmp[i]);
            }}
          />
          <Link
            to={
              messages[i]
                ? {
                    pathname: `/agreement/create/${trip.traveler.id}/${trip.offer.id}/${trip.id}`,
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
                settleOffer(trip.id, 'ACCEPT', i);
              }}
            >
              {t('Accept')}
            </button>
          </Link>
          <button onClick={() => settleOffer(trip.id, 'REJECT', i)}>{t('Reject')}</button>
        </li>
      ))}
    </ul>
  ) : null;
};

export default OrderedOffers;
