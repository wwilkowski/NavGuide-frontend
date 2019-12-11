import React from 'react';
import RegisterForm, { FormValues } from '../../components/RegisterForm/RegisterForm';
import { Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { StoreType } from '../../store';
import { signUpRequest } from './actions';
const Registration: React.FC = () => {
  const dispatcher = useDispatch();
  const registrationData = useSelector((state: StoreType) => state.registration);

  const onRegisterFormSubmit = (user: FormValues) => {
    dispatcher(signUpRequest(user));
  };

  return (
    <div>
      <Switch>
        <Route exact path={'/register'}>
          <RegisterForm onSubmit={onRegisterFormSubmit} user={registrationData.user} />
        </Route>
        <Route>
          <p data-testid='content'>NotFoundPage</p>
        </Route>
      </Switch>
    </div>
  );
};

export default Registration;
