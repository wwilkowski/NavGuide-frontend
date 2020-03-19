import React from 'react';
import { useSelector } from 'react-redux';
import { StoreType } from '../../store';
import PrivateRoute from '../../shared/PrivateRoute';
import EditProfileForm from './EditProfileForm/EditProfileForm';
import { Switch } from 'react-router-dom';

const Profile = () => {
  const profile = useSelector((state: StoreType) => state.profile);
  const { isLoggedIn } = profile;
  return (
    <Switch>
      <PrivateRoute exact path='/profile' isLoggedIn={isLoggedIn} component={EditProfileForm} />
    </Switch>
  );
};

export default Profile;
