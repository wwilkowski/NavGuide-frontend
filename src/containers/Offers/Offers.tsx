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
import MaterialSwitch from '@material-ui/core/Switch';
import { useTranslation } from 'react-i18next';

const Offers = () => {
  const dispatcher = useDispatch();
  const { t } = useTranslation();
  const profile = useSelector((state: StoreType) => state.profile);
  const { user } = profile;
  const [position, setPosition] = useState<IPosition>({
    latitude: 53.01023065,
    longitude: 18.594376006630313,
    radius: 3.0,
  });

  const [place, setPlace] = useState<string>('UMK Wydział Matematyki i Informatyki');
  const [formView, setFormView] = useState(true);

  const onFormChange = (location: string) => {
    if (location.length === 0) {
      dispatcher(fetchSuggestedCitiesRequested(location, 0));
    } else {
      dispatcher(fetchSuggestedCitiesRequested(location, 10));
    }
  };

  const onSubmit = (formData: types.IOfferFormValues) => {
    // TODO: wyzerowanie sugerowanych miast po zaladowaniu strony
    dispatcher(fetchSuggestedCitiesRequested('', 0));
    dispatcher(actions.createOfferRequest(formData));
  };

  return (
    <Switch>
      <PrivateRoute exact path='/offers/create' isLoggedIn={user.role === 'GUIDE'}>
        <div className={styles.options}>
          <p>{t('View map')}</p>
          <MaterialSwitch checked={!formView} onChange={() => setFormView(!formView)} value='formView' color='primary' />
        </div>
        <div className={styles.container}>
          <OfferCreateForm
            onSubmit={onSubmit}
            onChange={onFormChange}
            position={position}
            setPosition={setPosition}
            place={place}
            setPlace={setPlace}
          />
          <div style={formView && window.innerWidth < 900 ? { visibility: 'hidden' } : {}}>
            <LeafletMap
              height={window.innerWidth > 800 ? '80vh' : '100vh'}
              position={position}
              trips={[]}
              chosenOfferId={0}
              setChosenOfferId={() => {}}
            />
          </div>
        </div>
      </PrivateRoute>
    </Switch>
  );
};

export default Offers;
