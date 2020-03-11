import React, { useEffect } from 'react';
import { StoreType } from '../../../store';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { getOfferByIdRequest } from '../actions';

type TParams = { id: string };

interface Props extends RouteComponentProps<TParams> {}

const OfferSale = (props: Props) => {
  const dispatcher = useDispatch();
  const currentOffer = useSelector((state: StoreType) => state.offerToBuy);
  useEffect(() => {
    dispatcher(getOfferByIdRequest(props.match.params.id));
  }, [dispatcher, props.match.params.id]);

  return <p>currentOffer</p>;
};

export default OfferSale;
