import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StoreType } from '../../../store';
import history from '../../../history';
import CreateAgreementForm from '../../../components/Offers/CreateAgreementForm/CreateAgreementForm';
import * as actions from '../../Offers/actions';
import TripListElement from '../../../components/TripBrowser/TripListElement';
import { RouteComponentProps } from 'react-router-dom';
import { IAgreementOffer } from '../types';
import { useTranslation } from 'react-i18next';

interface TParams {
  id: string;
}

const Agreement = (props: RouteComponentProps<TParams>) => {
  const isLogged = useSelector((state: StoreType) => state.profile.isLoggedIn);

  const dispatcher = useDispatch();

  const { t } = useTranslation();

  const currentOffer = useSelector((state: StoreType) => state.currentOfferReducer.offer);
  const agreements = useSelector((state: StoreType) => state.currentOfferReducer.agreements);

  const [pathFrom, setPathFrom] = useState<string>('');
  const [travelerId, setTravelerId] = useState<number>(-1);
  const [offerId, setOfferId] = useState<number>(-1);
  const [currentAgreement, setCurrentAgreement] = useState<IAgreementOffer>();

  useEffect(() => {
    if (props.location.state) if (props.location.state.pathFrom !== undefined) setPathFrom(props.location.state.pathFrom);

    dispatcher(actions.getOwnAgreementsRequest());
    // eslint-disable-next-line
  }, [dispatcher]);

  useEffect(() => {
    const url = history.location.pathname.substr(18);
    const slash = url.indexOf('/');
    const travelerId = parseInt(url.substr(0, slash), 10);
    const offerId = parseInt(url.substr(slash + 1), 10);
    setTravelerId(travelerId);
    setOfferId(offerId);
  }, []);

  useEffect(() => {
    if (offerId !== -1) dispatcher(actions.getOfferByIdRequest(offerId.toString()));
  }, [offerId, dispatcher]);

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

    const id = props.location.pathname;
    if (agreements) setCurrentAgreement(findAgreementById(parseInt(id.substr(id.length - 2), 10)));
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

  const getDate = (date: string) => {
    return date
      .toString()
      .replace('T', ' ')
      .substr(0, date.toString().indexOf('.'));
  };

  return (
    <div>
      {isLogged && pathFrom === '/profile' && (
        <div>
          <h2>Zadecyduj co zrobić z umową.</h2>
          {currentAgreement && <TripListElement trip={currentAgreement.offer} />}
          {currentAgreement ? (
            <>
              <p>
                {t('Planned Date')}: {getDate(currentAgreement.plannedDate)}
              </p>
              <p>
                {t('Price')}: {currentAgreement.price}zł {t(currentAgreement.offer.priceType)}
              </p>
              <p>{t('Description')}</p>
              <p>{currentAgreement.description}</p>
              <button onClick={() => handleSettleAgreement(currentAgreement.id, 'ACCEPT')}>{t('Accept')}</button>
              <button onClick={() => handleSettleAgreement(currentAgreement.id, 'REJECT')}>{t('Reject')}</button>
            </>
          ) : null}
        </div>
      )}
      {isLogged && pathFrom === '/profile/guide' && (
        <div>
          <h3>Panel tworzenia umowy</h3>
          {currentOffer && <TripListElement trip={currentOffer} />}
          {currentOffer && (
            <CreateAgreementForm
              tripBegin={currentOffer.begin}
              tripEnd={currentOffer.end}
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
