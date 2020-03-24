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
    <div>
      <TripListElement trip={currentOffer} />
      <form>
        <label htmlFor='message'>{t('Message to guide')}</label>
        <textarea id='message' value={message} onChange={e => setMessage(e.target.value)}></textarea>
        <DatePicker
          dateFormat='yyyy/MM/dd hh:mm'
          timeFormat='HH:mm'
          timeIntervals={15}
          showTimeSelect
          minDate={new Date(currentOffer.begin)}
          maxDate={new Date(currentOffer.end)}
          selected={date}
          onChange={date => setDate(date)}
        />
      </form>
      <button
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
      </button>
    </div>
  ) : (
    <p>{t('No offer')}</p>
  );
};

export default OfferSale;
