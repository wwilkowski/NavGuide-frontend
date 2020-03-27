import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../Offers/actions';
import { StoreType } from '../../../store';
import AcceptedOffers from '../../../components/Offers/AcceptedOffers/AcceptedOffers';
import OrderedOffers from '../../../components/Offers/OrderedOffers/OrderedOffers';
import { fetchGuideHistoryRequest } from '../../../containers/GuideProfile/actions';
import HistoryOffers from '../../../components/Offers/HistoryOffers/HistoryOffers';
import { Grid, Typography } from '@material-ui/core';

const EditGuidePanel = () => {
  const dispatcher = useDispatch();

  const activeOffers = useSelector((state: StoreType) => state.currentOfferReducer.activeOffers);
  const agreements = useSelector((state: StoreType) => state.currentOfferReducer.agreements);
  const historyOffers = useSelector((state: StoreType) => state.guideProfile.historyOffers);

  useEffect(() => {
    dispatcher(actions.getActiveOffersRequest());
    dispatcher(actions.getOwnAgreementsRequest());
  }, [dispatcher]);

  useEffect(() => {
    if (activeOffers) {
      if (activeOffers.length > 0) dispatcher(fetchGuideHistoryRequest(activeOffers[0].offer.owner.guideId));
    }
  }, [activeOffers, dispatcher]);

  return (
    <Grid container>
      <Grid item xs={12} sm={4}>
        <Typography>Powiadomienia</Typography>
        <OrderedOffers trips={activeOffers} agreements={agreements} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <h2>Zaakceptowane umowy</h2>
        <h1>(wycieczki się odbędą)</h1>
        <AcceptedOffers agreements={agreements} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <h2>Historia wycieczek</h2>
        <HistoryOffers trips={historyOffers} />
      </Grid>
    </Grid>
  );
};

export default EditGuidePanel;
