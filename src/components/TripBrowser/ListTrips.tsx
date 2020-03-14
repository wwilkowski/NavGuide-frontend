import React from 'react';
import * as types from './types';
import { ISingleTripType } from '../../containers/TripBrowser/types';
import { useTranslation } from 'react-i18next';
import TripListElement from './TripListElement';
import styles from './ListTrips.module.scss';

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
          <TripListElement key={trip.id} trip={trip} changeVisible={changeTripInfoVisible} />
        ))}
      </ul>
    </>
  );
};

export default ListTrips;
