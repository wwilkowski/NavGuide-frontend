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
import { getActiveOffersRequest } from '../../Offers/actions';

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

  const onEditProfileFormSubmit = (editUser: IUserFormValues) => {
    dispatcher(actions.editProfileRequest(editUser, user));
  };

  useEffect(() => {
    dispatcher(getActiveOffersRequest());
  }, [dispatcher]);

  useEffect(() => {
    console.log(activeTrips);
  }, [activeTrips]);

  return (
    <div className={styles.container}>
      <div className={sceneMode === Scene.profile ? styles.userContainer : styles.profileSectionHidden}>
        <div className={sceneMode === Scene.profile ? styles.profileSection : styles.profileSectionHidden}>
          <AvatarForm />
          <UserDataForm onSubmit={onEditProfileFormSubmit} templateUser={user} />
        </div>
      </div>
      <div className={sceneMode === Scene.activeOffers ? styles.profileSection : styles.profileSectionHidden}>
        {user.role === 'GUIDE' ? (
          <div>
            <h2>Zaintteresowanie ofertami</h2>
            <OrderedOffers trips={activeTrips} />
          </div>
        ) : (
          <div>
            <h2>Jesteś zainteresowany</h2>
          </div>
        )}
      </div>
      <div className={sceneMode === Scene.history ? styles.profileSection : styles.profileSectionHidden}>History</div>
      <ProfileMenu setScene={setSceneMode} />
    </div>
  );
};

export default EditProfileForm;
