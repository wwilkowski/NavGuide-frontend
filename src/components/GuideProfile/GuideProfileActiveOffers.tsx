import React, { useState, useEffect } from 'react';
import styles from './GuideProfileActiveOffers.module.scss';
import { useTranslation } from 'react-i18next';
import { ISingleTripType, IPosition } from '../../containers/TripBrowser/types';
import { IGuideProfileActiveOffersProps } from '../../containers/GuideProfile/types';
import { useSelector, useDispatch } from 'react-redux';
import { StoreType } from '../../store';
import * as actions from '../../containers/TripBrowser/actions';

const GuideProfileActiveOffers = (props: IGuideProfileActiveOffersProps) => {
  const { t } = useTranslation();

  const dispatcher = useDispatch();

  const [value, setValue] = useState<string>('');
  const tripsData = useSelector((state: StoreType) => state.tripBrowser.trips);

  ////// POBIERANIE WYCIECZEK
  const [formValue, setFormValue] = useState<string>('UMK Wydział Matematyki i Informatyki');
  const [positionValue, setPositionValue] = useState<IPosition>({
    latitude: 53.01023065,
    longitude: 18.594376006630313,
    radius: 3.0
  });

  useEffect(() => {
    const location = {
      displayName: formValue,
      coords: [positionValue.longitude, positionValue.latitude],
      class: '',
      type: '',
      address: {
        type: '',
        cityDistrict: '',
        country: '',
        countryCode: '',
        footway: '',
        neighbourhood: '',
        postcode: '',
        state: '',
        suburb: ''
      }
    };
    dispatcher(actions.fetchGeoTripsRequested(location.coords[1], location.coords[0], positionValue.radius * 1000, true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  ///////

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__title}>{t('Active Offers')}</div>
      <div className={styles.container__input}>
        <input value={value} onChange={handleChange} />
      </div>
      <div className={styles.container__content}>
        {tripsData.map((trip: ISingleTripType) => {
          //wyszukiwarka

          return (
            <div key={trip.id} className={styles.trip}>
              <div className={styles.trip__title}>{trip.name}</div>
              <div className={styles.trip__gallery}>
                <img src={trip.photos[0]} alt='' />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GuideProfileActiveOffers;
