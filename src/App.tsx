import React, { useEffect } from 'react';
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
import { NotFound } from './components/NotFound';
import GuidePanel from './containers/Profile/GuidePanel';
import Agreement from './containers/Offers/Agreement/Agreement';

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
        <Route path='/offers/create' component={Offers} />
        <Route exact path='/offers/:id' component={Offer} />
        <Route path='/offers/:id/buy' component={OfferSale} />
        <Route path='/agreement/create/:travelerid/:offerid' component={Agreement} />
        <Route exact path='/agreement/:id' component={Agreement} />
        <Route path='/register' component={Registration} />
        <Route exact path='/profile' component={Profile} />
        <Route path='/profile/guide' component={GuidePanel} />
        <Route path='/admin' component={AdminPanel} />
        <Route path='/guides/:guideId' component={GuideProfile} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default App;
