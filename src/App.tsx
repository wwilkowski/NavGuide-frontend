import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import './App.css';

const Home = () => <p data-testid='content'>HomePage</p>;
const Register = () => <p data-testid='content'>RegisterPage</p>;
const NotFound = () => <p data-testid='content'>NotFoundPage</p>;

const App: React.FC = () => {
  return (
    <div>
      <Link to='/' data-testid='homeLink'>
        Home
      </Link>
      <Link to='/register' data-testid='registerLink'>
        Register
      </Link>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/register' component={Register} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
