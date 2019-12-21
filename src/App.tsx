import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Registration from './containers/Registration/Registration';
import Header from './containers/Header/Header';
import Profile from './containers/Profile/Profile';
// import { NotificationContainer } from 'react-notifications';
// import 'react-notifications/lib/notifications.css';
import { useTranslation } from 'react-i18next';
import 'bulma/css/bulma.css';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

// templates
const Home = () => {
  const { t } = useTranslation();
  return <p data-testid='content'>{t('Home Page')}</p>;
};
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
        <Route exact path='/' component={Home} />
        <Route path='/register' component={Registration} />
        <Route path='/profile' component={Profile} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default App;
