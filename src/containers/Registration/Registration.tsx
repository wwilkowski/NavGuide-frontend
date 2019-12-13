import React from 'react';
import RegisterForm, { FormValues } from '../../components/RegisterForm/RegisterForm';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { StoreType } from '../../store';
import { confirmSignUpRequest } from './actions';
const Registration: React.FC = () => {
  const dispatcher = useDispatch();
  const registrationData = useSelector((state: StoreType) => state.registration);

  const onRegisterFormSubmit = (user: FormValues) => {
    dispatcher(confirmSignUpRequest(user));
  };

  return (
    <div>
      <Switch>
        <Route exact path={'/register'}>
          {registrationData.registrationInProgress ? <RegisterForm onSubmit={onRegisterFormSubmit} user={registrationData.user} /> : <Redirect to='/' />}
        </Route>
        <Route>
          <p data-testid='content'>NotFoundPage</p>
        </Route>
      </Switch>
    </div>
  );
};

export default Registration;
