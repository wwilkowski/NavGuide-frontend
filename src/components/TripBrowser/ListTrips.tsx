import React from 'react';
import * as types from './types';
import { ISingleTripType } from '../../containers/TripBrowser/types';
import { useTranslation } from 'react-i18next';
import TripListElement from './TripListElement';
import styles from './ListTrips.module.scss';
import { Container } from '@material-ui/core';

const ListTrips = ({ trips, closestTrips, mode, chosenOfferId, setChosenOfferId }: types.IListTripsProps) => {
  const { t } = useTranslation();

  const closestTripsData = closestTrips;

  return (
    <Container>
      {mode === types.ListMode.closest ? (
        <div>
          {t('No matching trips')}. {t('Trips in your area')}:
          <ul className={styles.listTrips}>
            {closestTripsData.map((trip: ISingleTripType) => (
              <div key={trip.id}>
                <TripListElement trip={trip} />
              </div>
            ))}
          </ul>
        </div>
      ) : mode === types.ListMode.popular ? (
        <p>
          {t('No matching trips')}. {t('The most popular trips')}:
        </p>
      ) : (
        <ul className={styles.listTrips}>
          {trips.map((trip: ISingleTripType) => (
            <div key={trip.id}>
              <TripListElement trip={trip} />
            </div>
          ))}
        </ul>
      )}
    </Container>
  );
};

export default ListTrips;
