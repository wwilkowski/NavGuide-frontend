import React from 'react';
import * as types from './types';
import { ISingleTripType } from '../../containers/TripBrowser/types';
import { useTranslation } from 'react-i18next';

const ListTrips = ({ trips, mode, onIncreaseRadius }: types.IListTripsProps) => {
  const { t } = useTranslation();
  console.log('LIST TRIPS DOSTALO: ', trips);
  return (
    <>
      {mode === 'random' ? (
        <p>
          {t('No matching trips')} {t('Suggested trips')}:
        </p>
      ) : null}
      {trips.length === 0 && mode === 'geo' ? (
        <p>
          {t('No matching trips')}. {t('Increase the radius?')}
          <button
            onClick={() => {
              onIncreaseRadius(5);
            }}
          >
            {t('ADD 5KM')}
          </button>
        </p>
      ) : null}
      <ul>
        {trips.map((trip: ISingleTripType) => (
          <li key={trip.id}>
            <p>
              {t('Trip number') + ' '}
              {trip.id}
            </p>
            <p>{trip.name}</p>
            <p>{trip.city}</p>
            <p>
              {t('Price')}: {trip.price} {trip.priceType}
            </p>
            <p>
              {t('Number of vievs')}: {trip.inSearch}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ListTrips;
