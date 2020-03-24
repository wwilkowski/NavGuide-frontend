import React, { useEffect, useState } from 'react';
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

type TParams = { id: string };

interface Props extends RouteComponentProps<TParams> {}

const OfferSale = (props: Props) => {
  const { t } = useTranslation();

  const dispatcher = useDispatch();

  const currentOffer = useSelector((state: StoreType) => state.currentOfferReducer.offer);

  useEffect(() => {
    dispatcher(getOfferByIdRequest(props.match.params.id));
  }, [dispatcher, props.match.params.id]);

  const [date, setDate] = useState<Date | null>(new Date());
  const [message, setMessage] = useState<string>('');
  // eslint-disable-next-line
  const [popupVisible, setPopupVisible] = useState<boolean>(false);

  return currentOffer ? (
    <div className={styles.container}>
      <TripListElement trip={currentOffer} />
      <form className={styles.form}>
        <label htmlFor='message'>Wiadomość do sprzedającego</label>
        <textarea id='message' value={message} onChange={e => setMessage(e.target.value)}></textarea>
        <DatePicker dateFormat='yyyy/MM/dd hh:mm' showTimeSelect showTimeInput selected={date} onChange={date => setDate(date)} />
        <Button
          variant='contained'
          color='primary'
          onClick={() => {
            const tripBegin = new Date(currentOffer.begin);
            const tripEnd = new Date(currentOffer.end);

            if (!(date !== null && date.getTime() >= tripBegin.getTime() && date.getTime() <= tripEnd.getTime())) {
              showNotification('warning', i18n.t('Bad date!'), i18n.t('Please set date between begin and end offer'));
            } else if (message === '') {
              showNotification('warning', i18n.t('Bad message!'), i18n.t('Message can not be empty'));
            } else {
              dispatcher(buyOfferRequest(currentOffer.id.toString(), date, message));
            }
          }}
        >
          {t('Order offer')}
        </Button>
      </form>
    </div>
  ) : (
    <p>{t('No offer')}</p>
  );
};

export default OfferSale;
