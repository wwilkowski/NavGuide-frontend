import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Registration from './containers/Registration/Registration';
import Header from './containers/Header/Header';

const Home = () => <p data-testid='content'>HomePage</p>;
const NotFound = () => <p data-testid='content'>NotFoundPage</p>;

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/register' component={Registration} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default App;
