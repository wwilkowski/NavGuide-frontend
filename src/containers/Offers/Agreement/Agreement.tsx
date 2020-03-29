import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StoreType } from '../../../store';
import history from '../../../history';
import CreateAgreementForm from '../../../components/Offers/CreateAgreementForm/CreateAgreementForm';
import * as actions from '../../Offers/actions';
import TripListElement from '../../../components/TripBrowser/TripListElement';
import { RouteComponentProps } from 'react-router-dom';
import { IAgreementOffer, IOffer } from '../types';
import { useTranslation } from 'react-i18next';
import AgreementTraveler from '../../../components/Offers/SettleAgreement/SettleAgreement';
import { Typography, Button, makeStyles } from '@material-ui/core';

interface TParams {
  id: string;
}

const useStyles = makeStyles({
  text: {
    marginTop: '1rem'
  }
});

const Agreement = (props: RouteComponentProps<TParams>) => {
  const classes = useStyles();

  const isLogged = useSelector((state: StoreType) => state.profile.isLoggedIn);

  const dispatcher = useDispatch();

  const { t } = useTranslation();

  const currentOffer = useSelector((state: StoreType) => state.currentOfferReducer.offer);
  const agreements = useSelector((state: StoreType) => state.currentOfferReducer.agreements);
  const activeOffers = useSelector((state: StoreType) => state.currentOfferReducer.activeOffers);

  const [pathFrom, setPathFrom] = useState<string>('');
  const [travelerId, setTravelerId] = useState<number>(-1);
  const [offerId, setOfferId] = useState<number>(-1);
  const [purchaseId, setPurchaseId] = useState<number>(-1);
  const [touristPlannedDate, setTouristPlannedDate] = useState<Date>(new Date());
  const [currentAgreement, setCurrentAgreement] = useState<IAgreementOffer>();

  useEffect(() => {
    if (props.location.state) if (props.location.state.pathFrom !== undefined) setPathFrom(props.location.state.pathFrom);

    dispatcher(actions.getOwnAgreementsRequest());
    // eslint-disable-next-line
  }, [dispatcher]);

  useEffect(() => {
    const url = history.location.pathname.substr(18);
    const slash = url.indexOf('/');
    const secondSlash = url.substr(slash + 1).indexOf('/') + slash + 1;
    const travelerId = parseInt(url.substr(0, slash), 10);
    const offerId = parseInt(url.substr(slash + 1, slash + 2), 10);
    const purchaseId = parseInt(url.substr(secondSlash + 1), 10);
    setTravelerId(travelerId);
    setOfferId(offerId);
    setPurchaseId(purchaseId);
  }, []);

  useEffect(() => {
    if (offerId !== -1) dispatcher(actions.getOfferByIdRequest(offerId.toString()));
  }, [offerId, dispatcher]);

  useEffect(() => {
    if (purchaseId !== -1 && activeOffers) {
      activeOffers.forEach((offer: IOffer) => {
        if (offer.id === purchaseId) setTouristPlannedDate(new Date(offer.plannedDate));
      });
    }
  }, [purchaseId, activeOffers]);

  useEffect(() => {
    if (pathFrom === '/profile/guide') {
      setTravelerId(props.location.state.travelerId);
      setOfferId(props.location.state.offerId);

      dispatcher(actions.getActiveOffersRequest());
    }
    // eslint-disable-next-line
  }, [pathFrom, dispatcher]);

  useEffect(() => {
    const findAgreementById = (id: number) => {
      let agreement;

      agreements.forEach((agr: IAgreementOffer) => {
        if (agr.id === id) agreement = agr;
      });
      return agreement;
    };

    if (agreements) setCurrentAgreement(findAgreementById(parseInt(props.location.pathname.substr(11))));
  }, [agreements, props.location.pathname]);

  const handleCreateAgreementClick = (description: string, plannedDate: Date, price: number) => {
    const newAgreement = {
      offerId: offerId,
      description: description,
      userId: travelerId,
      plannedDate: plannedDate.toISOString(),
      price: price
    };

    dispatcher(actions.createAgreementRequest(newAgreement));
  };

  const handleCancelAgreementClick = () => {
    console.log('cancel create agreement');
  };

  const handleSettleAgreement = (id: number, status: string) => {
    dispatcher(actions.settleAgreementRequest(id, status));
  };

  return (
    <div>
      {isLogged && pathFrom === '/profile' && (
        <div>
          <h2>{t('Decide what to do with this agreement')}</h2>
          {currentAgreement && <AgreementTraveler currentAgreement={currentAgreement} handleSettleAgreement={handleSettleAgreement} />}
        //   <Typography variant='h2'>{t('Decide what to do with this agreement')}</Typography>
        //   {currentAgreement && (
        //     <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '1rem 0' }}>
        //       <Typography variant='subtitle2'>
        //         {t('Planned Date')}: {getDate(currentAgreement.plannedDate)}
        //       </Typography>
        //       <TripListElement trip={currentAgreement.offer} />
        //       <Typography variant='h4' className={classes.text}>
        //         {t('Price')}: {currentAgreement.price}zł {t(currentAgreement.offer.priceType)}
        //       </Typography>
        //       <Typography variant='subtitle2' className={classes.text}>
        //         {t('Description')}
        //       </Typography>
        //       <Typography variant='body1' className={classes.text}>
        //         {currentAgreement.description}
        //       </Typography>
        //       <div className={classes.text}>
        //         <Button variant='contained' color='primary' onClick={() => handleSettleAgreement(currentAgreement.id, 'ACCEPT')}>
        //           {t('Accept')}
        //         </Button>
        //         <Button variant='contained' color='primary' onClick={() => handleSettleAgreement(currentAgreement.id, 'REJECT')}>
        //           {t('Reject')}
        //         </Button>
        //       </div>
        //     </div>
        //   )}
        </div>
      )}
      {isLogged && pathFrom === '/profile/guide' && (
        <div>
          <h3>
            <b>{t('Agreement create panel')}</b>
          </h3>
          {currentOffer && (
            <CreateAgreementForm
              trip={currentOffer}
              purchasePlannedDate={touristPlannedDate}
              propOfferId={offerId}
              propUserId={travelerId}
              createAgreementClick={handleCreateAgreementClick}
              createAgreementCancel={handleCancelAgreementClick}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Agreement;
