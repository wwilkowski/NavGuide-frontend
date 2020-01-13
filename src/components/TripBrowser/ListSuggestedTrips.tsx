import React from 'react';
import { IListSuggestedTripsProps } from './types';
import { IPosition, ISuggestedPlace } from '../../containers/TripBrowser/types';

const ListSuggestedTrips = ({ onCityClick, onCityHover, suggestedTrips, activeTags }: IListSuggestedTripsProps) => {
  const position: IPosition = {
    latitude: 0,
    longitude: 0,
    radius: 0
  };

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
