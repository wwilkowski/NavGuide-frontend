import 'bulma/css/bulma.css';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { Route, Switch } from 'react-router-dom';
import Header from './containers/Header/Header';
import Registration from './containers/Registration/Registration';
import Profile from './containers/Profile/Profile';
import TripBrowser from './containers/TripBrowser/TripBrowser';

// templates

const NotFound = () => {
  const { t } = useTranslation();
  return <p data-testid='content'>{t('Not found')}</p>;
};

const App: React.FC = () => {
  return (
    <>
      <ReactNotification />
      <Header />
      <Switch>
        <Route exact path='/'>
          <TripBrowser />
        </Route>
        <Route path='/register' component={Registration} />
        <Route path='/profile' component={Profile} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default App;

//<Route path='/register' component={Registration} />
