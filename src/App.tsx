import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { Route, Switch } from 'react-router-dom';
import Header from './containers/Header/Header';
import Registration from './containers/Registration/Registration';
import Profile from './containers/Profile/Profile';
import TripBrowser from './containers/TripBrowser/TripBrowser';
import Offers from './containers/Offers/Offers';
import OfferSale from './containers/Offers/OfferSale/OfferSale';
import { useDispatch } from 'react-redux';
import { getProfileRequest } from './containers/Profile/actions';
import AdminPanel from './containers/AdminPanel/AdminPanel';
import 'bulma/css/bulma.css';
import GuideProfile from './containers/GuideProfile/GuideProfile';
import Offer from './containers/Offers/Offer';
// templates

const NotFound = () => {
  const { t } = useTranslation();
  return <p data-testid='content'>{t('Not found')}</p>;
};

const App: React.FC = () => {
  const dispatcher = useDispatch();

  useEffect(() => {
    dispatcher(getProfileRequest());
  }, [dispatcher]);

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
        <Route path='/offers/:id' component={Offer} />
        <Route path='/offers/:id/buy' component={OfferSale} />
        <Route path='/offers' component={Offers} />
        <Route path='/admin' component={AdminPanel} />
        <Route path='/guide_profile' component={GuideProfile} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default App;
