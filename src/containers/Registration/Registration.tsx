import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import UserDataForm from '../../components/UserDataForm/UserDataForm';
import RegisterForm from './RegisterForm/RegisterForm';
import { StoreType } from '../../store';
import PrivateRoute from '../../shared/PrivateRoute';
import GuideRegisterForm from '../../components/GuideRegisterForm/GuideRegisterForm';

const Registration: React.FC = () => {
  const registrationData = useSelector((state: StoreType) => state.registration);
  const isLoggedIn = useSelector((state: StoreType) => state.profile.isLoggedIn);

  return (
    <div>
      <Switch>
        <Route exact path={'/register'}>
          {registrationData.registrationInProgress ? RegisterForm(UserDataForm) : <Redirect to='/' />}
        </Route>
        <PrivateRoute path={'/register/guide'} component={GuideRegisterForm} isLoggedIn={isLoggedIn} />
        <Route>
          <p data-testid='content'>NotFoundPage</p>
        </Route>
      </Switch>
    </div>
  );
};

export default Registration;
