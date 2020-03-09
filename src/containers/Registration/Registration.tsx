import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import UserDataForm from '../../components/UserDataForm/UserDataForm';
import RegisterForm from './RegisterForm/RegisterForm';
import { StoreType } from '../../store';
import PrivateRoute from '../../shared/PrivateRoute';
import GuideForm from './GuideForm/GuideForm';

const Registration: React.FC = () => {
  const isLoggedIn = useSelector((state: StoreType) => state.profile.isLoggedIn);

  return (
    <div>
      <Switch>
        <Route exact path={'/register'}>
          {RegisterForm(UserDataForm)}
        </Route>
        <PrivateRoute path={'/register/guide'} component={GuideForm} isLoggedIn={isLoggedIn} />
        <Route>
          <p data-testid='content'>NotFoundPage</p>
        </Route>
      </Switch>
    </div>
  );
};

export default Registration;
