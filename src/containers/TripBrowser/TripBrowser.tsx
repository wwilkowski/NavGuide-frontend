import React, { useState } from "react";
import { ISingleTripType, IMultiTripsType } from "./types";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./actions";
import { StoreType } from "../../store";
import SearchForm from "../../components/TripBrowser/SearchForm";
import ListTrips from "../../components/TripBrowser/ListTrips";
import ListSuggestedTrips from "../../components/TripBrowser/ListSuggestedTrips";
import { templateCities } from "./TemplateTrips";

const TripBrowser: React.FC = () => {
  const [mode, setMode] = useState<string>("");
  const generateRandomTrips = () => {
    let randomId: number = 0;
    const min = 1;
    const max = tripsData.trips.length;


    //i ustala ile ma wylosowac wycieczek (czasami pojawia sie jedna wiecej???)
    let i = 0;
    while (i < 5) {
      randomId = Math.floor(Math.random() * (max - min) + min);

      tripsData.trips.forEach((el: ISingleTripType) => {
        if (el.id === randomId && !filterTripsData.includes(el)) {
          filterTripsData.push(el);
          i++;
        }
      });
    }
    setSearchedTrips(filterTripsData);
    setMode("random");
  };

  let filterTripsData: ISingleTripType[] = [];

  const tripsData = useSelector((state: StoreType) => state.tripBrowser);
  const dispatcher = useDispatch();
  dispatcher(actions.fetchTripsFromStore());

  const [suggestedTrips, setSuggestedTrips] = useState<string[]>([]);
  const onSearchFormChange = (location: string) => {
    const listCities: string[] = [];
    templateCities.forEach((el: string) => {
      if (el.substr(0, location.length) === location && location.length > 0) {
        listCities.push(el);
      }
    });
    setSuggestedTrips(listCities);
  };

  const [searchedTrips, setSearchedTrips] = useState<ISingleTripType[]>([]);
  const onSearchFormSubmit = (location: string) => {
    !templateCities.includes(location) && location.length > 0
      ? generateRandomTrips()
      : tripsData.trips.forEach((el: ISingleTripType) => {
          if (el.location === location) filterTripsData.push(el);
          setMode("normal");
        });
    setSuggestedTrips([]);
    setSearchedTrips(filterTripsData);
  };

  return (
    <div>
      <SearchForm
        onChange={onSearchFormChange}
        onSubmit={onSearchFormSubmit}
        trips={searchedTrips}
      />
      <ListSuggestedTrips
        onCityClick={onSearchFormSubmit}
        suggestedTrips={suggestedTrips}
      />
      <ListTrips trips={searchedTrips} mode={mode} />
    </div>
  );
};

export default TripBrowser;
