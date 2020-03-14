import React, { useEffect, useState } from 'react';
import { StoreType } from '../../../store';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { getOfferByIdRequest, buyOfferRequest } from '../actions';
import TripListElement from '../../../components/TripBrowser/TripListElement';
import DatePicker from 'react-datepicker';

type TParams = { id: string };

interface Props extends RouteComponentProps<TParams> {}

const OfferSale = (props: Props) => {
  const dispatcher = useDispatch();
  const currentOffer = useSelector((state: StoreType) => state.currentOfferReducer.offer);
  useEffect(() => {
    dispatcher(getOfferByIdRequest(props.match.params.id));
  }, [dispatcher, props.match.params.id]);

  useEffect(() => {}, [currentOffer]);

  const [date, setDate] = useState<Date | null>(new Date());
  const [message, setMessage] = useState<string>('');
  console.log(currentOffer);
  return currentOffer ? (
    <div>
      <TripListElement trip={currentOffer} changeVisible={() => {}} />
      <form>
        <label htmlFor='message'>Wiadomość do sprzedającego</label>
        <textarea id='message' value={message} onChange={e => setMessage(e.target.value)}></textarea>
        <DatePicker dateFormat='yyyy/MM/dd' selected={date} onChange={date => setDate(date)} />
      </form>
      <button
        onClick={() => {
          if (date != null) {
            dispatcher(buyOfferRequest(currentOffer.id.toString(), date, message));
          }
        }}
      >
        Zamów ofertę
      </button>
    </div>
  ) : (
    <p>Nie ma oferty</p>
  );
};

export default OfferSale;
