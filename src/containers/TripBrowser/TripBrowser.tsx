import React, { useState } from "react";
import { ISingleTripType, IMultiTripsType } from "./types";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./actions";
import { StoreType } from "../../store";
import SearchForm from "../../components/TripBrowser/SearchForm";
import ListTrips from "../../components/TripBrowser/ListTrips";

const TripBrowser: React.FC = () => {
  const tripsData = useSelector((state: StoreType) => state.tripBrowser);

  const dispatcher = useDispatch();
  dispatcher(actions.fetchTripsFromStore());

  const [trips, setTrips] = useState<ISingleTripType[]>([]);

  //filtrowanie wycieczek
  let filterTripsData: ISingleTripType[] = [];
  const onSearchFormSubmit = (location: string) => {
    tripsData.trips.forEach((el: ISingleTripType) => {
      if (el.location === location) filterTripsData.push(el);
    });
    setTrips(filterTripsData);
  };

  return (
    <div>
      <SearchForm onSubmit={onSearchFormSubmit} />
      <ListTrips trips={trips} />
    </div>
  );
};

export default TripBrowser;
