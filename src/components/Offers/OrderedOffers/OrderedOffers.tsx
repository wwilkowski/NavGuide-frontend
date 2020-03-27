import React, { useState, useEffect } from 'react';
import TripListElement from '../../TripBrowser/TripListElement';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../../../containers/Offers/actions';
import { IProfileOffersProps, IOffer } from '../../../containers/Offers/types';
import { showNotification } from '../../../helpers/notification';
import { useTranslation } from 'react-i18next';
import history from '../../../history';
import VerifyPopup from '../../../shared/VerifyPopup';
import { Button, TextField } from '@material-ui/core';

const OrderedOffers = ({ trips, agreements }: IProfileOffersProps) => {
  const { t } = useTranslation();

  const dispatcher = useDispatch();

  // eslint-disable-next-line
  const [messages, setMessages] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [filteredTrips, setFilteredTrips] = useState<IOffer[]>([]);
  const [agreementsTrips] = useState<IOffer[]>([]);
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [offerId, setOfferId] = useState<number>(-1);

  useEffect(() => {
    if (trips) setFilteredTrips(trips.filter((trip: IOffer) => trip.status === 'PENDING'));
  }, [trips]);

  useEffect(() => {
    console.log(currentMessage);
    if (currentMessage.length >= 10) setErrorMessage('');
  }, [currentMessage]);

  const getDate = (date: Date) => {
    return date
      .toString()
      .replace('T', ' ')
      .substr(0, date.toString().indexOf('.'));
  };

  const settleOffer = (tripId: number, status: string, message: string) => {
    if (message) dispatcher(actions.settleActiveOfferRequest(tripId, status, message));
    else showNotification('warning', t('Form error'), t('Message is required') + '!');
  };

  return filteredTrips && filteredTrips.length ? (
    <ul>
      {agreementsTrips.map((trip: IOffer, i: number) => (
        <li key={i}>
          <p>{trip.plannedDate}</p>
          <Button
            variant='contained'
            color='primary'
            onClick={() =>
              history.push('/agreement/create', { pathFrom: '/profile/guide', offerId: trip.offer.id, travelerId: trip.traveler.id })
            }
          >
            {t('Create agreement')}
          </Button>
        </li>
      ))}
      {filteredTrips.map((trip: IOffer, i: number) => (
        <li key={i}>
          <p>
            <b>{t('Planned date')}:</b> {getDate(trip.plannedDate)}
          </p>
          <TripListElement trip={trip.offer} />
          <p>
            <b>{t('Message from tourist')}:</b>
          </p>
          <p>{trip.message}</p>
          <Link to={`/users/${trip.traveler.id}`}>
            <p>
              {t('Check user profile with ID')} {trip.traveler.id}
            </p>
          </Link>
          <TextField
            id='outlined-multiline-static'
            label={t('Message to guide')}
            multiline
            rows='4'
            value={messages[i]}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              let tmp = messages;
              tmp[i] = e.target.value;
              setMessages(tmp);
              setCurrentMessage(tmp[i]);
            }}
            variant='outlined'
          />
          {errorMessage !== '' && <div>{errorMessage}</div>}
          <div>
            <Button
              variant='contained'
              color='primary'
              onClick={() => {
                if (errorMessage === '') {
                  setPopupVisible(true);
                  setStatus('ACCEPT');
                  setOfferId(trip.id);
                }
              }}
            >
              {t('Accept')}
            </Button>
            <Button
              variant='contained'
              color='primary'
              onClick={() => {
                if (currentMessage === '') setErrorMessage('Message is required');
                else if (currentMessage.length < 10) setErrorMessage('Min number of character is 10');
                else if (errorMessage === '') {
                  setPopupVisible(true);
                  setOfferId(trip.id);
                  setStatus('REJECT');
                }
              }}
            >
              {t('Reject')}
            </Button>
          </div>
          <VerifyPopup
            onSubmit={() => {
              settleOffer(offerId, status, currentMessage);
              setMessages([]);
              setCurrentMessage('');
              if (status !== 'REJECT') {
                history.push(`/agreement/create/${trip.traveler.id}/${trip.offer.id}/${trip.id}`, {
                  pathFrom: '/profile/guide',
                  offerId: trip.offer.id,
                  travelerId: trip.traveler.id
                });
              }
            }}
            popupVisible={popupVisible}
            changePopupVisible={() => setPopupVisible(!popupVisible)}
          />
        </li>
      ))}
    </ul>
  ) : null;
};

export default OrderedOffers;
