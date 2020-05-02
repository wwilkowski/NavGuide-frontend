import React, { useRef, useEffect } from 'react';
import { IListSuggestedTripsProps } from './types';
import { ISuggestedPlace } from '../../containers/TripBrowser/types';
import styles from './ListSuggestedTrips.module.scss';
import { useDispatch } from 'react-redux';
import Loader from 'react-loader-spinner'


const ListSuggestedTrips = ({ onCityClick, suggestedTrips, changeVisible, dataLoading }: IListSuggestedTripsProps) => {
  const node: any = useRef();

  const dispatcher = useDispatch();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (node.current.contains(e.target)) {
        // inside click
        return;
      }
      // outside click
      changeVisible();
    };

    // add when mounted
    document.addEventListener('mousedown', handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [dispatcher, changeVisible]);

  return (
    <ul className={styles.suggestedTripsList} ref={node}>
      {dataLoading ? (
        <li style={{display: 'flex', alignItems: 'center'}}>
          <span style={{marginRight: '0.8rem'}}>Loading </span>
          <Loader
              type="TailSpin"
              color="#000000"
              height={20}
              width={20}
          />
        </li>
        )
          :
        (
          suggestedTrips.length > 0 && suggestedTrips.map((trip: ISuggestedPlace, index: number) => (
              <li key={index} onClick={() => onCityClick(trip)}>
                <p>{trip.displayName}</p>
              </li>
          ))
        )
      }
    </ul>
  );
};

export default ListSuggestedTrips;
