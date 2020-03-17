import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StoreType } from '../../../store';
import UserDataForm from '../../../components/UserDataForm/UserDataForm';
import { IUserFormValues } from '../../../shared/types';
import * as actions from '../actions';
import AvatarForm from '../../../components/AvatarForm/AvatarForm';
import ProfileMenu from '../../../components/ProfileMenu/ProfileMenu';
import styles from './EditProfileForm.module.scss';
import OrderedOffers from '../../../components/OrderedOffers/OrderedOffers';
import ActiveOffers from '../../../components/ActiveOffers/ActiveOffers';
import { getActiveOffersRequest, getApproachesRequest } from '../../Offers/actions';
import HistoryOffers from '../../../components/HistoryOffers/HistoryOffers';

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
  const approaches = useSelector((state: StoreType) => state.currentOfferReducer.approaches);
  const historyOffersTraveler = useSelector((state: StoreType) => state.currentOfferReducer.approaches);
  const historyOffersGuide = useSelector((state: StoreType) => state.currentOfferReducer.activeOffers);

  const onEditProfileFormSubmit = (editUser: IUserFormValues) => {
    dispatcher(actions.editProfileRequest(editUser, user));
  };

  useEffect(() => {
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
        <h2>Historia Weryfikacji Ofert</h2>
        {user.role === 'TRAVELER' && <HistoryOffers trips={historyOffersTraveler} role={user.role} />}
        {user.role === 'GUIDE' && <HistoryOffers trips={historyOffersGuide} role={user.role} />}
      </div>
      <ProfileMenu setScene={setSceneMode} />
    </div>
  );
};

export default EditProfileForm;
