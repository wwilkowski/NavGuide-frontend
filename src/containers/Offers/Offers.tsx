import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StoreType } from '../../store';
import PrivateRoute from '../../shared/PrivateRoute';
import { Switch } from 'react-router-dom';
import OfferCreateForm from '../../components/OfferCreateForm/OfferCreateForm';
import LeafletMap from '../../components/LeafletMap/LeafletMap';
import { IPosition } from '../TripBrowser/types';
import { fetchSuggestedCitiesRequested } from '../../containers/TripBrowser/actions';
import * as types from './types';
import * as actions from './actions';
import styles from './Offers.module.scss';

const Offers = () => {
  const dispatcher = useDispatch();
  const profile = useSelector((state: StoreType) => state.profile);
  const { user } = profile;

  const [position, setPosition] = useState<IPosition>({
    latitude: 53.01023065,
    longitude: 18.594376006630313,
    radius: 3.0
  });

  const [place, setPlace] = useState<string>('UMK Wydział Matematyki i Informatyki');

  const onFormChange = (location: string) => {
    if (location.length === 0) {
      dispatcher(fetchSuggestedCitiesRequested(location, 0));
    } else {
      dispatcher(fetchSuggestedCitiesRequested(location, 10));
    }
  };

  const onSubmit = (formData: types.IOfferFormValues) => {
    dispatcher(actions.createOfferRequest(formData));
  };

  return (
    <Switch>
      <PrivateRoute exact path='/offers/create' isLoggedIn={user.role === 'GUIDE'}>
        <div className={styles.container}>
          <OfferCreateForm
            onSubmit={onSubmit}
            onChange={onFormChange}
            position={position}
            setPosition={setPosition}
            place={place}
            setPlace={setPlace}
          />
          <div className={styles.mapContainer}>
            <LeafletMap height='80vh' position={position} trips={[]} chosenOfferId={0} setChosenOfferId={() => {}} />
          </div>
        </div>
      </PrivateRoute>
    </Switch>
  );
};

export default Offers;
