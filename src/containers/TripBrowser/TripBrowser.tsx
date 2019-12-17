import React, { useState } from "react";
import { ISingleTripType, IMultiTripsType } from "./types";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./actions";
import { StoreType } from "../../store";
import SearchForm from "../../components/TripBrowser/SearchForm";
import ListTrips from "../../components/TripBrowser/ListTrips";
import ListSuggestedTrips from "../../components/TripBrowser/ListSuggestedTrips";

const TripBrowser: React.FC = () => {
  const tripsData = useSelector((state: StoreType) => state.tripBrowser);

  const dispatcher = useDispatch();
  dispatcher(actions.fetchTripsFromStore());

  let filterTripsData: ISingleTripType[] = [];

  const [suggestedTrips, setSuggestedTrips] = useState<ISingleTripType[]>([]);
  const onSearchFormChange = (location: string) => {
    filterTripsData = [];
    tripsData.trips.forEach((el: ISingleTripType) => {
      if (
        el.location.substr(0, location.length) === location &&
        location.length > 0
      )
        filterTripsData.push(el);
    });
    setSuggestedTrips(filterTripsData);
  };

  const [trips, setTrips] = useState<ISingleTripType[]>([]);
  const onSearchFormSubmit = (location: string) => {
    tripsData.trips.forEach((el: ISingleTripType) => {
      if (el.location === location) filterTripsData.push(el);
    });
    setTrips(filterTripsData);
  };

  return (
    <div>
      <SearchForm
        onChange={onSearchFormChange}
        onSubmit={onSearchFormSubmit}
        trips={trips}
      />
      <ListSuggestedTrips trips={suggestedTrips} />
      <ListTrips trips={trips} />
    </div>
  );
};

export default TripBrowser;
