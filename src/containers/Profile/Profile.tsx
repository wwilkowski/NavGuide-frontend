import React from 'react';
import { useSelector } from 'react-redux';
import { StoreType } from '../../store';
import PrivateRoute from '../../shared/PrivateRoute';
import { Switch } from 'react-router-dom';

const Profile = () => {
  const isLoggedIn = useSelector((state: StoreType) => state.profile.isLoggedIn);
  return (
    <Switch>
      <PrivateRoute exact path='/profile' component={Profile} isLoggedIn={isLoggedIn} />
      {/* <PrivateRoute exact path='/profile/edit' component={Edit} isLoggedIn={isLoggedIn} /> */}
    </Switch>
  );
};

export default Profile;
