import React from "react";
import { IListSuggestedTripsProps } from "./types";

const ListSuggestedTrips = ({
  onCityClick,
  suggestedTrips
}: IListSuggestedTripsProps) => {
  return (
    <ul>
      {suggestedTrips.map((trip: string, index: number) => (
        <>
          <li key={index.toString()} onClick={() => onCityClick(trip)}>
            {trip}
          </li>
        </>
      ))}
    </ul>
  );
};

export default ListSuggestedTrips;
