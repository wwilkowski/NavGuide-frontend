import React, { useEffect, useState } from 'react';
import styles from './EditGuidePanel.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../Offers/actions';
import { StoreType } from '../../../store';
import AcceptedOffers from '../../../components/Offers/AcceptedOffers/AcceptedOffers';
import OrderedOffers from '../../../components/Offers/OrderedOffers/OrderedOffers';
import { fetchGuideHistoryRequest } from '../../../containers/GuideProfile/actions';
import HistoryOffers from '../../../components/Offers/HistoryOffers/HistoryOffers';
import { useTranslation } from 'react-i18next';

const EditGuidePanel = () => {
  const { t } = useTranslation();

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

  const style = {
    color: 'red',
    fontSize: '1.5em'
  };

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h2 style={style}>{t('Notifications')}</h2>
        <OrderedOffers trips={activeOffers} agreements={agreements} />
      </div>
      <div className={styles.section}>
        <h2 style={style}>{t('Upcoming trips')}</h2>
        <AcceptedOffers agreements={agreements} />
      </div>
      <div className={styles.section}>
        <h2 style={style}>{t('Completed trips')}</h2>
        <HistoryOffers trips={historyOffers} />
      </div>
    </div>
  );
};

export default EditGuidePanel;
