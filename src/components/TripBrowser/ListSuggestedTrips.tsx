import React from "react";
import { IListSuggestedTripsProps } from "./types";
import { IPosition } from "../../containers/TripBrowser/types";

const ListSuggestedTrips = ({
  onCityClick,
  onCityHover,
  suggestedTrips,
  activeTags
}: IListSuggestedTripsProps) => {
  const position: IPosition = {
    latitude: 0,
    longitude: 0,
    radius: 0
  };

  return (
    <ul>
      {suggestedTrips.map((trip: string, index: number) => (
        <a
          key={index.toString()}
          onClick={() => onCityClick(trip, position, "location", activeTags)}
          onMouseEnter={() => onCityHover(trip)}
        >
          {trip}
        </a>
      ))}
    </ul>
  );
};

export default ListSuggestedTrips;
