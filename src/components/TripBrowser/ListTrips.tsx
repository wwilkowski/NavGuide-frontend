import React from 'react';
import * as types from './types';
import { ISingleTripType, ITag } from '../../containers/TripBrowser/types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { StoreType } from '../../store';
import styles from './ListTrips.module.scss';
import TripInfo from '../TripInfo/TripInfo';

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
      <ul className={styles.tripsList}>
        {trips.map((trip: ISingleTripType) => (
          <li
            className={styles.listItem}
            key={trip.id}
            onMouseOver={() => {
              setChosenOfferId(trip.id);
            }}
            onMouseOut={() => {
              setChosenOfferId(null);
            }}
            onClick={() => changeTripInfoVisible(trip.id)}
          >
            <img
              className={styles.img}
              src={trip.photos ? trip.photos[0] : 'https://pwik.krzanowice.pl/uploads/default-image.png'}
              alt='zdjęcie oferty'
            />
            <div className={styles.description}>
              <h2 className={styles.title}>
                {trip.name} <span className={styles.itemId}> (ID: {trip.id})</span>
              </h2>
              <div className={styles.informations}>
                <p>
                  {t('City')}: {trip.city}
                </p>
                <p>
                  {t('Price')}: {trip.price} <span>({t(priceTypes['PER_PERSON'])})</span>
                </p>
                {isLogged && trip.owner && (
                  <div>
                    <p>
                      {t('Guide')}: {trip.owner.firstName} {trip.owner.lastName}
                    </p>

                    <p>{t('Languages')}: </p>
                    <ul>
                      {trip.owner.languages.map((lang: string) => (
                        <li>
                          <span>{lang}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {trip.tags.length > 0 && (
                <ul className={styles.tagList}>
                  {trip.tags.map((tag: ITag) => (
                    <li key={tag.name} className={styles.tag}>
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
