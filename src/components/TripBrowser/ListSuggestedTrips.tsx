import React, { useRef, useEffect } from 'react';
import { IListSuggestedTripsProps } from './types';
import { ISuggestedPlace } from '../../containers/TripBrowser/types';
import styles from './ListSuggestedTrips.module.scss';

const ListSuggestedTrips = ({ onCityClick, onCityHover, suggestedTrips, changeVisible }: IListSuggestedTripsProps) => {
  const node: any = useRef();

  useEffect(() => {
    // add when mounted
    document.addEventListener('mousedown', handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  const handleClick = (e: MouseEvent) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    changeVisible();
  };

  return (
    <ul className={styles.suggestedTripsList} ref={node}>
      {suggestedTrips.map((trip: ISuggestedPlace, index: number) => (
        <li key={index} onClick={() => onCityClick(trip)} onMouseEnter={() => onCityHover(trip)}>
          <p>{trip.name}</p>
        </li>
      ))}
    </ul>
  );
};

export default ListSuggestedTrips;
