import React from "react";
import { IListSuggestedTripsProps } from "./types";
import { ISingleTripType } from "../../containers/TripBrowser/types";

const ListSuggestedTrips = ({ trips }: IListSuggestedTripsProps) => {
  const suggestedTrips = trips.map((trip: ISingleTripType) => (
    <>
      <li onClick={() => console.log(trip.location)}>{trip.location}</li>
    </>
  ));

  return <ul>{suggestedTrips}</ul>;
};

export default ListSuggestedTrips;
