import React, { useEffect } from 'react';
import { StoreType } from '../../../store';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { getOfferByIdRequest } from '../actions';
import TripListElement from '../../../components/TripBrowser/TripListElement';
import { getToken } from '../../../helpers/tokenCookie';

type TParams = { id: string };

interface Props extends RouteComponentProps<TParams> {}

const OfferSale = (props: Props) => {
  const dispatcher = useDispatch();
  const currentOffer = useSelector((state: StoreType) => state.currentOfferReducer.offer);
  useEffect(() => {
    dispatcher(getOfferByIdRequest(props.match.params.id));
  }, [dispatcher, props.match.params.id]);

  useEffect(() => {}, [currentOffer]);

  return currentOffer ? (
    <div>
      <TripListElement trip={currentOffer} changeVisible={() => {}} />
      <button>Zamów ofertę</button>
    </div>
  ) : (
    <p>Nie ma oferty</p>
  );
};

export default OfferSale;
