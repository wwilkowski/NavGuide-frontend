import React, { useState, useEffect } from 'react';
import TripListElement from '../../TripBrowser/TripListElement';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../../../containers/Offers/actions';
import { IProfileOffersProps, IOffer } from '../../../containers/Offers/types';
import { showNotification } from '../../../helpers/notification';
import { useTranslation } from 'react-i18next';
import history from '../../../history';
import VerifyPopup from '../../../shared/VerifyPopup';
import { Button, TextField, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  text: {
    marginTop: '1rem'
  },
  list: {
    marginBottom: '3rem'
  },
  description: {
    textAlign: 'center',
    padding: '0 1rem',
    margin: '0.5rem 0'
  }
});

const OrderedOffers = ({ trips, agreements }: IProfileOffersProps) => {
  const { t } = useTranslation();
  const classes = useStyles();

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
    const tmp = sessionStorage.getItem('data');
    if (tmp) {
      const data = JSON.parse(tmp);
      const tmp2 = messages;
      tmp2[data.index] = data.message;
      setMessages(tmp2);
      sessionStorage.removeItem('data');
    }
  }, [messages]);

  useEffect(() => {
    if (trips) setFilteredTrips(trips.filter((trip: IOffer) => trip.status === 'PENDING'));
  }, [trips]);

  useEffect(() => {
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
    <ul className={classes.list}>
      {agreementsTrips.map((trip: IOffer, i: number) => (
        <li key={i}>
          <p>{trip.plannedDate}</p>
          <Button
            variant='contained'
            color='primary'
            onClick={() =>
              history.push('/agreement/create', { pathFrom: '/profile/guide', offerId: trip.id, travelerId: trip.traveler.id })
            }
          >
            {t('Create agreement')}
          </Button>
        </li>
      ))}
      {filteredTrips.map((trip: IOffer, i: number) => (
        <li key={i} style={{ padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '1rem 0' }}>
          <Typography variant='subtitle2'>
            <b>{t('Planned date')}:</b> {getDate(trip.plannedDate)}
          </Typography>
          <TripListElement trip={trip.offer} hidePhoto={true} />
          <Typography variant='h4' className={classes.text}>
            {t('Message from tourist')}:
          </Typography>
          <Typography variant='subtitle2' className={classes.description}>
            {trip.message}
          </Typography>
          <Link to={`/users/${trip.traveler.id}`} className={classes.text}>
            {t('Check user profile with')} ID {trip.traveler.id}
          </Link>
          <TextField
            id='outlined-multiline-static'
            label={t('Message to tourist')}
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
            style={{ width: '100%' }}
            className={classes.text}
          />
          {errorMessage !== '' && <div>{errorMessage}</div>}
          <div className={classes.text}>
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
