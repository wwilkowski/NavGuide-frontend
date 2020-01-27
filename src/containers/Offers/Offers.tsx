import React from 'react';
import { useSelector } from 'react-redux';
import { StoreType } from '../../store';
import PrivateRoute from '../../shared/PrivateRoute';
import { Switch, Route } from 'react-router-dom';
import OfferCreateForm from '../../components/OfferCreateForm/OfferCreateForm';

const Offers = () => {
  const profile = useSelector((state: StoreType) => state.profile);
  const { user } = profile;
  return (
    <Switch>
      <Route exact path='/offers'>
        <p> Offers </p>
      </Route>
      <PrivateRoute exact path='/offers/create' isLoggedIn={user.role === 'GUIDE'} component={OfferCreateForm} />
    </Switch>
  );
};

export default Offers;
