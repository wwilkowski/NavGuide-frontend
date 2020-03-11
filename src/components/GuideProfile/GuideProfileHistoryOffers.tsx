import React, { useState, useEffect } from 'react';
import styles from './GuideProfileHistoryOffers.module.scss';
import { IGuideProfileHistoryOffersProps } from '../../containers/GuideProfile/types';
import { useTranslation } from 'react-i18next';
import { IEndedSingleTripType } from '../../containers/TripBrowser/types';
import back from '../../assets/icons/back.png';

const GuideProfileHistoryOffers = (props: IGuideProfileHistoryOffersProps) => {
  const { t } = useTranslation();

  const { historyOffers, goBack } = props;

  const [value, setValue] = useState<string>('');
  const [filteredTrips, setFilteredTrips] = useState<IEndedSingleTripType[]>([
    {
      date: '',
      offer: {
        averageMark: -1,
        city: '',
        description: '',
        id: -1,
        lat: -1,
        lon: -1,
        maxPeople: -1,
        name: '',
        owner: {
          experience: -1,
          firstName: '',
          guideId: -1,
          languages: [''],
          lastName: '',
          userId: -1
        },
        photos: [''],
        price: -1,
        priceType: '',
        radius: -1,
        sold: -1,
        tags: [{ id: -1, name: '' }]
      }
    }
  ]);

  useEffect(() => {
    if (historyOffers) {
      setFilteredTrips(
        historyOffers.filter((trip: IEndedSingleTripType) => {
          if (trip.offer.name.substr(0, value.length) === value) return true;

          return false;
        })
      );
    }
  }, [value, historyOffers]);

  useEffect(() => {
    setFilteredTrips(historyOffers);
  }, [historyOffers]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleGalleryClick = () => {};

  return (
    <div className={styles.container}>
      <div className={styles.container__title}>
        {t('History Offers')}
        <div className={styles.backButton} onClick={goBack}>
          <img src={back} alt='' />
        </div>
      </div>
      <div className={styles.container__input}>
        <input value={value} onChange={handleChange} />
      </div>
      <div className={styles.container__content}>
        {filteredTrips.map((trip: IEndedSingleTripType) => (
          <div key={trip.offer.id} className={styles.trip}>
            <div className={styles.trip__title}>{trip.offer.name}</div>
            <div className={styles.trip__gallery} onClick={handleGalleryClick}>
              <img src={trip.offer.photos[0]} alt='' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuideProfileHistoryOffers;
