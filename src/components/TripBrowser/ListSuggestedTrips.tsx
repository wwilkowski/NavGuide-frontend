import React from 'react';
import { IListSuggestedTripsProps } from './types';
import { IPosition, ISuggestedPlace } from '../../containers/TripBrowser/types';

const ListSuggestedTrips = ({ onCityClick, onCityHover, suggestedTrips }: IListSuggestedTripsProps) => {
  return (
    <ul>
      {suggestedTrips.map((trip: ISuggestedPlace, index: number) => (
        <li key={index} onClick={() => onCityClick(trip)} onMouseEnter={() => onCityHover(trip)}>
          {trip.name}
        </li>
      ))}
    </ul>
  );
};

export default ListSuggestedTrips;
