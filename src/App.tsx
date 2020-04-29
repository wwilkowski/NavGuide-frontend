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
import { useDispatch, useSelector } from 'react-redux';
import { getProfileRequest } from './containers/Profile/actions';
import AdminPanel from './containers/AdminPanel/AdminPanel';
import 'bulma/css/bulma.css';
import GuideProfile from './containers/GuideProfile/GuideProfile';
import Offer from './containers/Offers/Offer';
import { NotFound } from './components/NotFound';
import GuidePanel from './containers/Profile/GuidePanel';
import Agreement from './containers/Offers/Agreement/Agreement';
import EditProfile from './containers/Profile/EditProfile/EditProfile';
import User from './containers/User/User';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { StoreType } from './store';

const App: React.FC = () => {
  const dispatcher = useDispatch();

  const isLogged = useSelector((state: StoreType) => state.profile.isLoggedIn);

  useEffect(() => {
    if (isLogged) dispatcher(getProfileRequest());
  }, [dispatcher, isLogged]);

  const theme = createMuiTheme({
    typography: {
      fontFamily: 'Lato, sans-serif',
      h2: {
        fontSize: 24,
        fontWeight: 600,
        margin: '1rem',
      },
      h3: {
        fontSize: 16,
        fontWeight: 600,
        margin: '0.5rem 0',
      },
      h4: {
        fontSize: 14,
        fontWeight: 600,
      },
      subtitle1: {
        fontSize: 12,
      },
      subtitle2: {
        color: 'rgba(0, 0, 0, 0.54)',
        fontSize: '0.8rem',
      },
      body1: {
        fontSize: '0.9em',
      },
      button: {
        fontSize: '0.9em',
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <ReactNotification />
      <Header />
      <Switch>
        <Route exact path='/'>
          <TripBrowser />
        </Route>
        <Route path='/offers/create' component={Offers} />
        <Route exact path='/offers/:id' component={Offer} />
        <Route path='/offers/:id/buy' component={OfferSale} />
        <Route path='/agreement/create/:travelerid/:offerid/:activeofferid' component={Agreement} />
        <Route exact path='/agreement/:id' component={Agreement} />
        <Route path='/register' component={Registration} />
        <Route exact path='/profile' component={Profile} />
        <Route path='/profile/edit' component={EditProfile} />
        <Route path='/profile/guide' component={GuidePanel} />
        <Route path='/admin' component={AdminPanel} />
        <Route exact path='/users/:userId' component={User} />
        <Route path='/guides/:guideId' component={GuideProfile} />
        <Route component={NotFound} />
      </Switch>
    </ThemeProvider>
  );
};

export default App;
