import React from 'react';
import * as types from './types';
import { ISingleTripType } from '../../containers/TripBrowser/types';
import { useTranslation } from 'react-i18next';
import TripListElement from './TripListElement';
import styles from './ListTrips.module.scss';
import { Link } from 'react-router-dom';

const ListTrips = ({ trips, mode, chosenOfferId, setChosenOfferId, changeTripInfoVisible }: types.IListTripsProps) => {
  const { t } = useTranslation();

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
          <li key={trip.id}>
            <Link to={`/offers/${trip.id}`}>
              <TripListElement trip={trip} changeVisible={changeTripInfoVisible} />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ListTrips;
