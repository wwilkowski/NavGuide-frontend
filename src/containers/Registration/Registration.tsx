import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import { FormValues } from '../../components/RegisterForm/types';
import { StoreType } from '../../store';
import * as actions from './actions';
import PrivateRoute from '../../shared/PrivateRoute';
import GuideRegisterForm from '../../components/GuideRegisterForm/GuideRegisterForm';

const Registration: React.FC = () => {
  const dispatcher = useDispatch();
  const registrationData = useSelector((state: StoreType) => state.registration);
  const isLoggedIn = useSelector((state: StoreType) => state.profile.isLoggedIn);

  const onRegisterFormSubmit = (user: FormValues, toBeGuide: boolean) => {
    dispatcher(actions.confirmSignUpRequest(user, registrationData.registrationToken, toBeGuide));
  };

  return (
    <div>
      <Switch>
        <Route exact path={'/register'}>
          {registrationData.registrationInProgress ? (
            <RegisterForm onSubmit={onRegisterFormSubmit} templateUser={registrationData.templateUser} />
          ) : (
            <Redirect to='/' />
          )}
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
