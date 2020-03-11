import React, { useState, useEffect } from 'react';
import styles from './GuideProfileActiveOffers.module.scss';
import { useTranslation } from 'react-i18next';
import { ISingleTripType, ITag } from '../../containers/TripBrowser/types';
import { IGuideProfileActiveOffersProps } from '../../containers/GuideProfile/types';
import back from '../../assets/icons/back.png';

const GuideProfileActiveOffers = (props: IGuideProfileActiveOffersProps) => {
  const { t } = useTranslation();

  const { activeOffers, goBack } = props;

  const [value, setValue] = useState<string>('');
  const [visibleIds, setVisibleIds] = useState<number[]>([]);
  const [filteredTrips, setFilteredTrips] = useState<ISingleTripType[]>([
    {
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
  ]);

  useEffect(() => {
    if (activeOffers) {
      setFilteredTrips(
        activeOffers.filter((trip: ISingleTripType) => {
          if (trip.name.substr(0, value.length) === value) return true;
          return false;
        })
      );
    }
  }, [value, activeOffers]);

  useEffect(() => {
    setFilteredTrips(activeOffers);
  }, [activeOffers]);

  useEffect(() => {
    console.log(visibleIds);
  }, [visibleIds]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const toogleTripVisible = (id: number) => {
    if (visibleIds.includes(id)) {
      const index = visibleIds.indexOf(id);
      setVisibleIds(visibleIds.splice(index, 1));
    } else {
      setVisibleIds(visibleIds.concat([id]));
    }
  };

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
          <div key={trip.id} className={styles.trip} onClick={() => toogleTripVisible(trip.id)}>
            <div className={styles.trip__title}>{trip.name}</div>
            <div className={styles.trip__gallery}>
              <img src={trip.photos[0]} alt='' />
            </div>
            <div className={visibleIds.includes(trip.id) ? styles.trip__data : styles.trip__dataHidden}>
              <p>{t('Informations')}</p>
              <p>{t('City')}:</p>
              <p>{trip.city}</p>
              <p>{t('Price')}:</p>
              <p>
                {trip.price} {trip.priceType}
              </p>
              <p>{t('Max people')}:</p>
              <p>{trip.maxPeople}</p>
              <p>{t('Availability')}:</p>
              <p>{t('From')}:</p>
              <p>1.01.2020</p>
              <p>{t('To')}:</p>
              <p>1.03.2020</p>
              {trip.tags.map((tag: ITag) => (
                <div key={tag.id}>{tag.name} </div>
              ))}
              <p>{t('Sold')}:</p>
              <p>{trip.sold}</p>
              <p>{t('Average mark')}:</p>
              <p>{trip.averageMark}</p>
              <p>{t('Number of visits')}:</p>
              <p>23</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuideProfileActiveOffers;
