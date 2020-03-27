import React, { useEffect, useState } from 'react';
import styles from './EditGuidePanel.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../Offers/actions';
import { StoreType } from '../../../store';
import AcceptedOffers from '../../../components/Offers/AcceptedOffers/AcceptedOffers';
import OrderedOffers from '../../../components/Offers/OrderedOffers/OrderedOffers';
import { fetchGuideHistoryRequest } from '../../../containers/GuideProfile/actions';
import HistoryOffers from '../../../components/Offers/HistoryOffers/HistoryOffers';
import { IEndedSingleTripType, ISingleTripType } from '../../TripBrowser/types';
import { Grid, Typography } from '@material-ui/core';

const EditGuidePanel = () => {
  const dispatcher = useDispatch();

  const activeOffers = useSelector((state: StoreType) => state.currentOfferReducer.activeOffers);
  const agreements = useSelector((state: StoreType) => state.currentOfferReducer.agreements);
  const historyOffers = useSelector((state: StoreType) => state.guideProfile.historyOffers);

  const [transformedHistoryOffers, setTransformedHistoryOffers] = useState<ISingleTripType[]>([]);

  useEffect(() => {
    dispatcher(actions.getActiveOffersRequest());
    dispatcher(actions.getOwnAgreementsRequest());
  }, [dispatcher]);

  useEffect(() => {
    if (activeOffers) {
      if (activeOffers.length > 0) dispatcher(fetchGuideHistoryRequest(activeOffers[0].offer.owner.guideId));
    }
  }, [activeOffers, dispatcher]);

  useEffect(() => {
    const tmp: ISingleTripType[] = [];
    historyOffers.forEach((offer: IEndedSingleTripType) => {
      tmp.push({
        inSearch: offer.offer.inSearch,
        averageMark: offer.offer.averageMark,
        begin: offer.offer.begin,
        city: offer.offer.city,
        description: offer.offer.description,
        end: offer.offer.end,
        id: offer.offer.id,
        lat: offer.offer.lat,
        lon: offer.offer.lon,
        maxPeople: offer.offer.maxPeople,
        name: offer.offer.name,
        owner: {
          experience: offer.offer.owner.experience,
          firstName: offer.offer.owner.firstName,
          guideId: offer.offer.owner.guideId,
          languages: offer.offer.owner.languages,
          lastName: offer.offer.owner.lastName,
          userId: offer.offer.owner.userId
        },
        photos: offer.offer.photos,
        price: offer.offer.price,
        priceType: offer.offer.priceType,
        radius: offer.offer.radius,
        sold: offer.offer.sold,
        tags: offer.offer.tags
      });
    });

    setTransformedHistoryOffers(tmp);
  }, [historyOffers, dispatcher]);

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
        <HistoryOffers trips={transformedHistoryOffers} />
      </Grid>
    </Grid>
  );
};

export default EditGuidePanel;
