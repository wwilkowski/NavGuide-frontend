import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StoreType } from '../../../store';
import * as actions from '../actions';
import { getOwnAgreementsRequest, settleAgreementRequest } from '../../Offers/actions';
import ProfileMenu from '../../../components/ProfileMenu/ProfileMenu';
import styles from './EditProfilePanel.module.scss';
import ActiveOffers from '../../../components/Offers/ActiveOffers/ActiveOffers';
import { getActiveOffersRequest, getApproachesRequest } from '../../Offers/actions';
import VerifiedOffers from '../../../components/Offers/VerifiedOffers/VerifiedOffers';
import HistoryOffers from '../../../components/Offers/HistoryOffers/HistoryOffers';
import Agreements from '../../../components/Offers/Agreements/Agreements';
import AcceptedOffers from '../../../components/Offers/AcceptedOffers/AcceptedOffers';
import { useTranslation } from 'react-i18next';
import UserProfile from '../../../components/UserProfile/UserProfile';

enum Scene {
  profile,
  history,
  activeOffers
}

const EditProfilePanel = () => {
  const { t } = useTranslation();

  const dispatcher = useDispatch();

  const [sceneMode, setSceneMode] = useState<Scene>(Scene.profile);

  const user = useSelector((state: StoreType) => state.profile.user);

  const approaches = useSelector((state: StoreType) => state.currentOfferReducer.approaches);
  const verifiedOffersTraveler = useSelector((state: StoreType) => state.currentOfferReducer.approaches);
  const historyOffersTraveler = useSelector((state: StoreType) => state.profile.historyOffers);
  const agreements = useSelector((state: StoreType) => state.currentOfferReducer.agreements);

  const onAgreementButtonClick = (agreementId: number, status: string) => {
    dispatcher(settleAgreementRequest(agreementId, status));
  };

  useEffect(() => {
    dispatcher(actions.getProfileHistoryRequest(-1));
    dispatcher(getOwnAgreementsRequest());

    if (user.role === 'GUIDE') {
      dispatcher(getActiveOffersRequest());
    } else {
      dispatcher(getApproachesRequest());
    }
  }, [dispatcher, user.role]);

  const style = {
    color: 'red',
    fontSize: '1.5rem'
  };

  return (
    <div className={styles.container}>
      <div className={sceneMode === Scene.profile ? styles.userContainer : styles.profileSectionHidden}>
        <div className={sceneMode === Scene.profile ? styles.profileSection : styles.profileSectionHidden}>
          <UserProfile user={user} />
        </div>
      </div>
      <div className={sceneMode === Scene.activeOffers ? styles.profileSection : styles.profileSectionHidden}>
        <div>
          <h2 style={style}>{t('You are interested')}</h2>
          <ActiveOffers trips={approaches} agreements={[]} />
          {agreements && (
            <>
              <h2 style={style}>{t('Your agreements')} </h2>
              <Agreements agreements={agreements} verifiedOffers={verifiedOffersTraveler} onAgreementButtonClick={onAgreementButtonClick} />
            </>
          )}
        </div>
      </div>
      <div className={sceneMode === Scene.history ? styles.profileSection : styles.profileSectionHidden}>
        <h2 style={style}>{t('Accepted approaches')}</h2>
        <VerifiedOffers trips={verifiedOffersTraveler} state={'accepted'} />
      </div>
      <div className={styles.profileSectionHidden}>
        <h2 style={style}>{t('Rejected approaches')}</h2>
        <VerifiedOffers trips={verifiedOffersTraveler} state={'rejected'} />
      </div>
      <div className={styles.profileSectionHidden}>
        <h2 style={style}>{t('Upcoming trips')}</h2>
        <AcceptedOffers agreements={agreements} />
      </div>
      <div className={styles.profileSectionHidden}>
        <h2 style={style}>{t('Completed trips')}</h2>
        <HistoryOffers trips={historyOffersTraveler} />
      </div>
      <ProfileMenu setScene={setSceneMode} />
    </div>
  );
};

export default EditProfilePanel;
