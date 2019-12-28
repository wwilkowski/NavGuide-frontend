import 'bulma/css/bulma.css';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { Route, Switch } from 'react-router-dom';
import Header from './containers/Header/Header';
import Registration from './containers/Registration/Registration';
import { useSelector } from 'react-redux';
import { StoreType } from './store';
import Profile from './containers/Profile/Profile';

// templates
const Home = () => {
  const { t } = useTranslation();
  return <p data-testid='content'>{t('Home Page')}</p>;
};
const NotFound = () => {
  const { t } = useTranslation();
  return <p data-testid='content'>{t('Not found')}</p>;
};

const Edit = () => {
  return <p> Edit! </p>;
};

const App: React.FC = () => {
  const isLoggedIn = useSelector((state: StoreType) => state.profile.isLoggedIn);

  return (
    <>
      <ReactNotification />
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/register' component={Registration} />
        <Route path='/profile' component={Profile} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default App;
