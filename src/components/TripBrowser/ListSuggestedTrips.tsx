import React from "react";
import { IListSuggestedTripsProps } from "./types";

const ListSuggestedTrips = ({
  onCityClick,
  onCityHover,
  suggestedTrips,
  activeTags
}: IListSuggestedTripsProps) => {
  return (
    <ul>
      {suggestedTrips.map((trip: string, index: number) => (
        <a
          key={index.toString()}
          onClick={() => onCityClick(trip, "location", activeTags)}
          onMouseEnter={() => onCityHover(trip)}
        >
          {trip}
        </a>
      ))}
    </ul>
  );
};

export default ListSuggestedTrips;
