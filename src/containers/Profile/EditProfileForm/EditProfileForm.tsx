import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StoreType } from '../../../store';
import UserDataForm from '../../../components/UserDataForm/UserDataForm';
import { IUserFormValues } from '../../../shared/types';
import * as actions from '../actions';
import { getOwnAgreementsRequest, createAgreementRequest, settleAgreementRequest } from '../../Offers/actions';
import AvatarForm from '../../../components/AvatarForm/AvatarForm';
import ProfileMenu from '../../../components/ProfileMenu/ProfileMenu';
import styles from './EditProfileForm.module.scss';
import OrderedOffers from '../../../components/Offers/OrderedOffers/OrderedOffers';
import ActiveOffers from '../../../components/Offers/ActiveOffers/ActiveOffers';
import { getActiveOffersRequest, getApproachesRequest } from '../../Offers/actions';
import VerifiedOffers from '../../../components/Offers/VerifiedOffers/VerifiedOffers';
import HistoryOffers from '../../../components/Offers/HistoryOffers/HistoryOffers';

enum Scene {
  profile,
  history,
  activeOffers
}

const EditProfileForm = () => {
  const dispatcher = useDispatch();

  const [sceneMode, setSceneMode] = useState<Scene>(Scene.profile);

  const user = useSelector((state: StoreType) => state.profile.user);

  const activeTrips = useSelector((state: StoreType) => state.currentOfferReducer.activeOffers);
  const verifiedOffersGuide = useSelector((state: StoreType) => state.currentOfferReducer.activeOffers);

  const approaches = useSelector((state: StoreType) => state.currentOfferReducer.approaches);
  const verifiedOffersTraveler = useSelector((state: StoreType) => state.currentOfferReducer.approaches);
  const historyOffersTraveler = useSelector((state: StoreType) => state.profile.historyOffers);

  const onEditProfileFormSubmit = (editUser: IUserFormValues) => {
    dispatcher(actions.editProfileRequest(editUser, user));
  };

  //testowanie
  /*useEffect(() => {
    const d = new Date();
    const agreement = {
      offerId: 6,
      description: 'test',
      userId: 11,
      price: 10,
      plannedDate: d.toString()
    };

    dispatcher(createAgreementRequest(agreement));
    dispatcher(settleAgreementRequest(1, 'test'));
  }, []);*/

  useEffect(() => {
    dispatcher(actions.getProfileHistoryRequest(-1));
    dispatcher(getOwnAgreementsRequest());

    if (user.role === 'GUIDE') {
      dispatcher(getActiveOffersRequest());
    } else {
      dispatcher(getApproachesRequest());
    }
  }, [dispatcher, user.role]);

  return (
    <div className={styles.container}>
      <div className={sceneMode === Scene.profile ? styles.userContainer : styles.profileSectionHidden}>
        <div className={sceneMode === Scene.profile ? styles.profileSection : styles.profileSectionHidden}>
          <AvatarForm />
          <UserDataForm onSubmit={onEditProfileFormSubmit} register={false} templateUser={user} />
        </div>
      </div>
      <div className={sceneMode === Scene.activeOffers ? styles.profileSection : styles.profileSectionHidden}>
        {user.role === 'GUIDE' ? (
          <div>
            <h2>Zainteresowanie ofertami</h2>
            <OrderedOffers trips={activeTrips} />
          </div>
        ) : (
          <div>
            <h2>Jesteś zainteresowany</h2>
            <ActiveOffers trips={approaches} />
          </div>
        )}
      </div>
      <div className={sceneMode === Scene.history ? styles.profileSection : styles.profileSectionHidden}>
        <h2>Zaakceptowane oferty</h2>
        {user.role === 'TRAVELER' && <VerifiedOffers trips={verifiedOffersTraveler} role={user.role} state={'accepted'} />}
        {user.role === 'GUIDE' && <VerifiedOffers trips={verifiedOffersGuide} role={user.role} state={'x'} />}
      </div>
      <div className={styles.profileSectionHidden}>
        <h2>Odrzucone oferty</h2>
        <VerifiedOffers trips={verifiedOffersTraveler} role={user.role} state={'rejected'} />
      </div>
      <div className={styles.profileSectionHidden}>
        <h2>Odbędą się</h2>
        sss{' '}
      </div>
      <div className={styles.profileSectionHidden}>
        <h2>Historia wycieczek</h2>
        <HistoryOffers trips={historyOffersTraveler} />
      </div>
      <ProfileMenu setScene={setSceneMode} />
    </div>
  );
};

export default EditProfileForm;
