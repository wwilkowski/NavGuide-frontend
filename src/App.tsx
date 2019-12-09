import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import RegisterForm from './containers/RegisterForm/RegisterForm';
import './App.css';

const Home = () => <p data-testid='content'>HomePage</p>;
const NotFound = () => <p data-testid='content'>NotFoundPage</p>;

const App: React.FC = () => {
  return (
    <>
      <Link to='/' data-testid='homeLink'>
        Home
      </Link>
      <Link to='/register' data-testid='registerLink'>
        Register
      </Link>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/register' component={RegisterForm} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default App;
