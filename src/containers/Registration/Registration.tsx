import React from 'react';
import RegisterForm, { FormValues } from '../../components/RegisterForm/RegisterForm';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StoreType } from '../../store';

const Registration: React.FC = () => {
  const user = useSelector((state: StoreType) => state.user);

  const onRegisterFormSubmit = (user: FormValues) => {
    console.log(user);
  };

  return (
    <div>
      <Switch>
        <Route exact path={'/register'}>
          <RegisterForm message='XD' onSubmit={onRegisterFormSubmit} user={user} />
        </Route>
        <Route>
          <p data-testid='content'>NotFoundPage</p>
        </Route>
      </Switch>
    </div>
  );
};

export default Registration;
