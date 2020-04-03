import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StoreType } from '../../../store';
import history from '../../../history';
import AgreementCreator from '../../../components/Offers/AgreementCreator';
import * as actions from '../../Offers/actions';
import { RouteComponentProps } from 'react-router-dom';
import { IAgreementOffer, IOffer } from '../types';
import { useTranslation } from 'react-i18next';
import { Typography, Button, makeStyles, Grid } from '@material-ui/core';
import TripListElement from '../../../components/TripBrowser/TripListElement';
import AgreementInfo from '../../../components/AgreementInfo';
import Chat from '../../../components/Chat';

interface TParams {
  id: string;
}

interface ShortUser {
  avatar: string;
  id: number;
}

interface Message {
  author: ShortUser;
  date: Date;
  description: string;
  id: number;
}

const useStyles = makeStyles({
  text: {
    marginTop: '1rem'
  }
});

const Agreement = (props: RouteComponentProps<TParams>) => {
  const classes = useStyles();

  const profile = useSelector((state: StoreType) => state.profile.user);
  const isLogged = useSelector((state: StoreType) => state.profile.isLoggedIn);

  const dispatcher = useDispatch();

  const { t } = useTranslation();

  const currentOffer = useSelector((state: StoreType) => state.currentOfferReducer.offer);
  const agreements = useSelector((state: StoreType) => state.currentOfferReducer.agreements);
  const activeOffers = useSelector((state: StoreType) => state.currentOfferReducer.activeOffers);
  const purchaseMessages = useSelector((state: StoreType) => state.currentOfferReducer.messages);

  const [pathFrom, setPathFrom] = useState<string>('');
  const [travelerId, setTravelerId] = useState<number>(-1);
  const [offerId, setOfferId] = useState<number>(-1);
  const [purchaseId, setPurchaseId] = useState<number>(-1);
  const [touristPlannedDate, setTouristPlannedDate] = useState<Date>(new Date());
  const [currentAgreement, setCurrentAgreement] = useState<IAgreementOffer>();
  const [isAgreementCreated, setAgreementCreated] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>();
  const [agreement, setAgreement] = useState<IAgreementOffer>();

  useEffect(() => {
    if (props.location.state) if (props.location.state.pathFrom !== undefined) setPathFrom(props.location.state.pathFrom);

    dispatcher(actions.getOwnAgreementsRequest());
    // eslint-disable-next-line
  }, [dispatcher]);

  useEffect(() => {
    if (purchaseId !== undefined && purchaseId !== -1) {
      dispatcher(actions.getMessagesRequest(purchaseId));
    }
  }, [dispatcher, purchaseId]);

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
    ifAgreementCreated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agreements]);

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

    if (agreements) {
      setCurrentAgreement(findAgreementById(parseInt(props.location.pathname.substr(11))));
      const actualAgreement = agreements.find(agr => agr.purchase.id === purchaseId);
      setAgreement(actualAgreement);
      if (actualAgreement) {
        setMessages([
          {
            author: actualAgreement.traveler as ShortUser,
            date: new Date(),
            description: actualAgreement.purchase.message,
            id: -1
          },
          {
            author: { ...actualAgreement.purchase.offer.owner, id: actualAgreement.purchase.offer.owner.userId } as ShortUser,
            date: new Date(),
            description: actualAgreement.purchase.feedbackMessage,
            id: -1
          }
        ]);
      }
    }
  }, [agreements, currentAgreement, props.location.pathname, purchaseId]);

  const handleCreateAgreementClick = (description: string, plannedDate: Date, price: number) => {
    const newAgreement = {
      purchaseId: purchaseId,
      description: description,
      userId: travelerId,
      plannedDate: plannedDate.toISOString(),
      price: price
    };

    dispatcher(actions.createAgreementRequest(newAgreement));
  };

  const handleCancelAgreementClick = () => {
    console.warn('cancel create agreement');
  };

  const handleSettleAgreement = (id: number, status: string) => {
    dispatcher(actions.settleAgreementRequest(id, status));
  };

  const getDate = (date: string) => {
    return date
      .toString()
      .replace('T', ' ')
      .substr(0, date.toString().indexOf('.'));
  };

  const ifAgreementCreated = () => {
    if (!agreements || agreements.length === 0) {
      setAgreementCreated(false);
      return;
    }
    let dec = false;
    agreements.forEach(agreement => {
      if (agreement.purchase.id === purchaseId) {
        setCurrentAgreement(agreement);
        dec = true;
        return;
      }
    });
    setAgreementCreated(dec);
  };

  return (
    <div>
      {isLogged && (
        <div>
          {currentAgreement && (
            <div>
              <Typography variant='h2'>{t('Decide what to do with this agreement')}</Typography>
              <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '1rem 0' }}>
                <Typography variant='subtitle2'>
                  {t('Planned Date')}: {getDate(currentAgreement.plannedDate)}
                </Typography>
                <TripListElement trip={currentAgreement.offer} />
                <Typography variant='h4' className={classes.text}>
                  {t('Price')}: {currentAgreement.price}zł {t(currentAgreement.offer.priceType)}
                </Typography>
                <Typography variant='subtitle2' className={classes.text}>
                  {t('Description')}
                </Typography>
                <Typography variant='body1' className={classes.text}>
                  {currentAgreement.description}
                </Typography>
                <div className={classes.text}>
                  <Button variant='contained' color='primary' onClick={() => handleSettleAgreement(currentAgreement.id, 'ACCEPT')}>
                    {t('Accept')}
                  </Button>
                  <Button variant='contained' color='primary' onClick={() => handleSettleAgreement(currentAgreement.id, 'REJECT')}>
                    {t('Reject')}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {isLogged && (
        <Grid container>
          <Grid item xs={4}>
            <h3>
              <b>{t('Agreement create panel')}</b>
            </h3>
            {profile.id !== travelerId ? <p>Jestes guidem</p> : <p>Jestes turysta</p>}
            {currentOffer &&
              (profile.id !== travelerId ? (
                isAgreementCreated ? (
                  <>
                    <p>Utworzyles juz umowę</p>
                    <AgreementInfo handleSettleAgreement={handleSettleAgreement} agreement={agreement} />
                  </>
                ) : (
                  <AgreementCreator
                    trip={currentOffer}
                    purchasePlannedDate={touristPlannedDate}
                    propOfferId={offerId}
                    propUserId={travelerId}
                    createAgreementClick={handleCreateAgreementClick}
                    createAgreementCancel={handleCancelAgreementClick}
                  />
                )
              ) : isAgreementCreated ? (
                <>
                  <p>Umowa utworzona</p>
                  <AgreementInfo handleSettleAgreement={handleSettleAgreement} agreement={agreement} />
                </>
              ) : (
                <p>Oferta jest w trakcie tworzenia</p>
              ))}
          </Grid>
          <Grid item xs={8}>
            {messages &&
              (purchaseMessages ? (
                <Chat messages={[...messages, ...purchaseMessages]} mode={profile.role} userId={profile.id} purchaseId={purchaseId} />
              ) : (
                <Chat messages={messages} mode={profile.role} userId={profile.id} purchaseId={purchaseId} />
              ))}
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Agreement;
