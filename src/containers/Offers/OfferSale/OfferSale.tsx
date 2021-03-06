import React, { useEffect, useState, ChangeEvent } from 'react';
import { StoreType } from '../../../store';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { getOfferByIdRequest, buyOfferRequest } from '../actions';
import TripListElement from '../../../components/TripBrowser/TripListElement';
import DatePicker from 'react-datepicker';
import { showNotification } from '../../../helpers/notification';
import i18n from '../../../locales/i18n';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import VerifyPopup from '../../../shared/VerifyPopup';
import { Typography, makeStyles, Grid } from '@material-ui/core';

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1rem',
  },
  text: {
    textAlign: 'center',
    margin: '0.5rem 0',
  },
  textarea: {
    width: '100%',
    marginBottom: '0.5rem',
  },
});

type TParams = { id: string };

interface Props extends RouteComponentProps<TParams> {}

const OfferSale = (props: Props) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const dispatcher = useDispatch();

  const currentOffer = useSelector((state: StoreType) => state.currentOfferReducer.offer);

  const [date, setDate] = useState<Date | null>(new Date());
  const [message, setMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  // eslint-disable-next-line
  const [popupVisible, setPopupVisible] = useState<boolean>(false);

  useEffect(() => {
    const tmp = sessionStorage.getItem('approachData');
    if (tmp) {
      const data = JSON.parse(tmp);
      setMessage(data.message);
      setDate(new Date(data.plannedDate));
      sessionStorage.removeItem('approachData');
    }
  }, []);

  useEffect(() => {
    dispatcher(getOfferByIdRequest(props.match.params.id, true));
  }, [dispatcher, props.match.params.id]);

  useEffect(() => {
    if (errorMessage) {
      if (message.length >= 10) setErrorMessage('');
    }
  }, [message, errorMessage]);

  return currentOffer ? (
    <div className={styles.container}>
      <div
        onClick={() => {
          const data = {
            message: message,
            plannedDate: date,
          };
          sessionStorage.setItem('approachData', JSON.stringify(data));
        }}
      >
        <TripListElement trip={currentOffer} />
      </div>
      <Typography variant='subtitle2' className={classes.text}>
        {t('Do you want to take part in this trip')}? {t('Write to the guide now')}!
      </Typography>
      <Typography variant='h4' className={classes.text}>
        {t('Suggest date and time')}
      </Typography>
      <Grid container justify={window.innerWidth > 900 ? 'center' : 'flex-start'} sm={12} xs={12}>
        <DatePicker
          locale='pl-PL'
          dateFormat='yyyy/MM/dd HH:mm '
          timeFormat='HH:mm'
          timeIntervals={30}
          showTimeSelect
          minDate={new Date(currentOffer.begin)}
          maxDate={new Date(currentOffer.end)}
          selected={date}
          onChange={(date) => setDate(date)}
        />
      </Grid>
      <Grid container justify='center' alignItems='center' xs={12} sm={3}>
        <Typography variant='h4' className={classes.text}>
          {t('Send message to guide')}
        </Typography>
        <TextField
          style={{ marginTop: '1rem' }}
          id='outlined-multiline-static'
          label={t('Message to guide')}
          multiline
          rows='4'
          value={message}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
          variant='outlined'
          className={classes.textarea}
        />
        {errorMessage !== '' ? (
          <Typography variant='body1' color='error'>
            {t(errorMessage)}!
          </Typography>
        ) : null}
      </Grid>
      <Grid container justify='center'>
        <Button
          variant='contained'
          color='primary'
          onClick={() => {
            const tripBegin = new Date(currentOffer.begin);
            const tripEnd = new Date(currentOffer.end);

            if (message === '') setErrorMessage(t('Message is required'));
            else if (message.length < 10) setErrorMessage('Min number of characters is 10');
            else if (date !== null && date.getTime() >= tripBegin.getTime() && date.getTime() <= tripEnd.getTime()) {
              setPopupVisible(true);
            } else {
              showNotification('warning', i18n.t('Bad date'), i18n.t('Please set date between begin and end offer'));
            }
          }}
        >
          {t('Order offer')}
        </Button>
      </Grid>
      <VerifyPopup
        onSubmit={() => {
          dispatcher(buyOfferRequest(currentOffer.id.toString(), date ? date : new Date(), message));
        }}
        popupVisible={popupVisible}
        changePopupVisible={() => setPopupVisible(!popupVisible)}
      />
    </div>
  ) : (
    <p style={{ textAlign: 'center' }}>{t('No offer')}</p>
  );
};

export default OfferSale;
