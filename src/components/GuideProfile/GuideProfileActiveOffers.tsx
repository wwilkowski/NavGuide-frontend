import React, { useState, useEffect } from 'react';
import styles from './GuideProfileActiveOffers.module.scss';
import { useTranslation } from 'react-i18next';
import { ISingleTripType } from '../../containers/TripBrowser/types';
import { IGuideProfileActiveOffersProps } from '../../containers/GuideProfile/types';
import back from '../../assets/icons/back.png';

const GuideProfileActiveOffers = (props: IGuideProfileActiveOffersProps) => {
  const { t } = useTranslation();

  const { activeOffers, goBack } = props;

  const [value, setValue] = useState<string>('');
  const [filteredTrips, setFilteredTrips] = useState<ISingleTripType[]>(activeOffers);

  useEffect(() => {
    setFilteredTrips(
      activeOffers.filter((trip: ISingleTripType) => {
        if (trip.name.substr(0, value.length) === value) return true;

        return false;
      })
    );
  }, [value, activeOffers]);

  useEffect(() => {
    setFilteredTrips(activeOffers);
  }, [activeOffers]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleGalleryClick = () => {};

  return (
    <div className={styles.container}>
      <div className={styles.container__title}>
        {t('Active Offers')}
        <div className={styles.backButton} onClick={goBack}>
          <img src={back} alt='' />
        </div>
      </div>
      <div className={styles.container__input}>
        <input value={value} onChange={handleChange} />
      </div>
      <div className={styles.container__content}>
        {filteredTrips.map((trip: ISingleTripType) => (
          <div key={trip.id} className={styles.trip}>
            <div className={styles.trip__title}>{trip.name}</div>
            <div className={styles.trip__gallery} onClick={handleGalleryClick}>
              <img src={trip.photos[0]} alt='' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuideProfileActiveOffers;
