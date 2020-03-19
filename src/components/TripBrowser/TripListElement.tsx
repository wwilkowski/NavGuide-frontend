import React from 'react';
import { ISingleTripType, ITag } from '../../containers/TripBrowser/types';
import styles from './TripListElement.module.scss';
import { useSelector } from 'react-redux';
import { StoreType } from '../../store';
import { useTranslation } from 'react-i18next';

interface Props {
  trip: ISingleTripType;
}

const priceTypes = {
  PER_PERSON: 'per person',
  PER_GROUP: 'per group'
};

const getLanguage = (code: string) => {
  switch (code) {
    case 'PL':
      return 'Polish';
    case 'EN':
      return 'English';
    case 'DE':
      return 'German';
  }
};

const TripListElement = ({ trip }: Props) => {
  const isLogged: boolean = useSelector((state: StoreType) => state.profile.isLoggedIn);
  const { t } = useTranslation();
  return (
    <div key={trip.id} className={styles.offer}>
      <img
        src={trip.photos ? trip.photos[0] : 'https://pwik.krzanowice.pl/uploads/default-image.png'}
        alt='offer view'
        className={styles.offer__photo}
      />
      <div className={styles.offer__desc}>
        <h2 className={styles.offer__title}>
          {trip.name} ({trip.id})
        </h2>
        <p className={styles.offer__p}>
          {t('City')}: {trip.city}
        </p>
        <p className={styles.offer__p}>
          {t('Price')}: {trip.price}zł <span>({t(priceTypes['PER_PERSON'])})</span>
        </p>
        {isLogged && trip.owner && (
          <div>
            <p className={styles.offer__p}>
              {t('Guide')}: {trip.owner.firstName} {trip.owner.lastName}
            </p>
            <div className={styles.offer__row}>
              <p className={styles.offer__p}>{t('Languages')}: </p>
              <ul className={styles.offer__languages}>
                {trip.owner.languages.map((lang: string) => (
                  <li className={styles.offer__langElement} key={lang}>
                    <span>{getLanguage(lang)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {trip.tags && trip.tags.length > 0 && (
          <ul className={styles.offer__tags}>
            {trip.tags.map((tag: ITag) => (
              <li key={tag.name} className={styles.offer__tag}>
                <span>{t(tag.name)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TripListElement;
