import React from 'react';
import { Switch, Route } from 'react-router-dom';
import GoogleLoginButton from '../../components/GoogleLoginButton/GoogleLoginButton';
import EditRegistrationForm from '../../components/EditRegistrationForm/EditRegistrationForm';
import { useDispatch } from 'react-redux';
import { signUpUserRequest } from './actions';
import PrivateRoute from '../../shared/PrivateRoute/PrivateRoute';

const RegisterForm: React.FC = () => {
  const dispatcher = useDispatch();
  const signUpUserWithCode = (code: string) => {
    dispatcher(signUpUserRequest(code));
  };
  return (
    <div>
      <Switch>
        <Route exact path={'/register'}>
          <h1 data-testid='content'>RegisterPage</h1>
          <GoogleLoginButton signUpUserWithCode={signUpUserWithCode} />
        </Route>
        <PrivateRoute path={`/register/edit`} component={EditRegistrationForm} />
        <Route>
          <p data-testid='content'>NotFoundPage</p>
        </Route>
      </Switch>
    </div>
  );
};

export default RegisterForm;
