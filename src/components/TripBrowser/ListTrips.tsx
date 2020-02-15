import React from 'react';
import * as types from './types';
import { ISingleTripType, ITag } from '../../containers/TripBrowser/types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { StoreType } from '../../store';
import styles from './ListTrips.module.scss';

const ListTrips = ({ trips, mode, chosenOfferId, setChosenOfferId, changeTripInfoVisible }: types.IListTripsProps) => {
  const isLogged: boolean = useSelector((state: StoreType) => state.profile.isLoggedIn);
  const { t } = useTranslation();
  const priceTypes = {
    PER_PERSON: 'per person',
    PER_GROUP: 'per group'
  };
  return (
    <>
      {mode === 'random' ? (
        <p>
          {t('No matching trips')} {t('Suggested trips')}:
        </p>
      ) : null}
      {trips.length === 0 && mode === 'geo' ? <p>{t('No matching trips')}.</p> : null}
      <ul className={styles.listTrips}>
        {trips.map((trip: ISingleTripType) => (
          <li
            key={trip.id}
            onMouseOver={() => {
              setChosenOfferId(trip.id);
            }}
            onMouseOut={() => {
              setChosenOfferId(null);
            }}
            onClick={() => changeTripInfoVisible(trip.id)}
            className={styles.offer}
          >
            <img
              src={trip.photos ? trip.photos[0] : 'https://pwik.krzanowice.pl/uploads/default-image.png'}
              alt='zdjęcie oferty'
              className={styles.offer__photo}
            />
            <div className={styles.offer__desc}>
              <h2 className={styles.offer__title}>
                {trip.name} <span> (ID: {trip.id})</span>
              </h2>
              <p className={styles.offer__p}>
                {t('City')}: {trip.city}
              </p>
              <p className={styles.offer__p}>
                {t('Price')}: {trip.price} <span>({t(priceTypes['PER_PERSON'])})</span>
              </p>
              {isLogged && trip.owner && (
                <div>
                  <p className={styles.offer__p}>
                    {t('Guide')}: {trip.owner.firstName} {trip.owner.lastName}
                  </p>

                  <p className={styles.offer__p}>{t('Languages')}: </p>
                  <ul>
                    {trip.owner.languages.map((lang: string) => (
                      <li>
                        <span>{lang}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {trip.tags.length > 0 && (
                <ul className={styles.offer__tags}>
                  {trip.tags.map((tag: ITag) => (
                    <li key={tag.name} className={styles.offer__tag}>
                      <span>{tag.name}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ListTrips;
