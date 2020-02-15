import React from 'react';
import { IListSuggestedTripsProps } from './types';
import { ISuggestedPlace } from '../../containers/TripBrowser/types';
import styles from './ListSuggestedTrips.module.scss';

const ListSuggestedTrips = ({ onCityClick, onCityHover, suggestedTrips }: IListSuggestedTripsProps) => {
  return (
    <ul className={styles.suggestedTripsList}>
      {suggestedTrips.map((trip: ISuggestedPlace, index: number) => (
        <li key={index} onClick={() => onCityClick(trip)} onMouseEnter={() => onCityHover(trip)}>
          <p>{trip.name}</p>
        </li>
      ))}
    </ul>
  );
};

export default ListSuggestedTrips;
