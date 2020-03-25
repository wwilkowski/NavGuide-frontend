import React from 'react';
import { useSelector } from 'react-redux';
import { StoreType } from '../../store';
import PrivateRoute from '../../shared/PrivateRoute';
import EditGuidePanel from './EditGuidePanel/EditGuidePanel';
import { Switch } from 'react-router-dom';

const GuidePanel = () => {
  const isLoggedIn = useSelector((state: StoreType) => state.profile.isLoggedIn);
  return (
    <Switch>
      <PrivateRoute path='/profile/guide' isLoggedIn={isLoggedIn} component={EditGuidePanel} />
    </Switch>
  );
};

export default GuidePanel;
