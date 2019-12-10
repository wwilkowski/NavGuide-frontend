import React from 'react';
import { Switch, Route } from 'react-router-dom';

const RegisterForm: React.FC = () => {
  return (
    <div>
      <Switch>
        <Route exact path={'/register'}>
          <h1 data-testid='content'>RegisterPage</h1>
        </Route>
        <Route>
          <p data-testid='content'>NotFoundPage</p>
        </Route>
      </Switch>
    </div>
  );
};

export default RegisterForm;
