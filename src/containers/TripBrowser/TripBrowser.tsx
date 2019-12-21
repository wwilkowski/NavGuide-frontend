import React, { useState } from "react";
import { ISingleTripType, IMultiTripsType, usePosition } from "./types";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./actions";
import { StoreType } from "../../store";
import SearchForm from "../../components/TripBrowser/SearchForm";
import ListTrips from "../../components/TripBrowser/ListTrips";
import ListSuggestedTrips from "../../components/TripBrowser/ListSuggestedTrips";
import { templateCities } from "./TemplateTrips";

const TripBrowser: React.FC = () => {
  const tripsData = useSelector((state: StoreType) => state.tripBrowser);
  const dispatcher = useDispatch();
  const [mode, setMode] = useState<string>(""); //tryb wyswietlania wycieczek (czy losowo czy normalnie)
  const [suggestedTrips, setSuggestedTrips] = useState<string[]>([]); //lista, pojawia się w podpowiedziach miejscowosci
  const [searchedTrips, setSearchedTrips] = useState<ISingleTripType[]>([]); //przefiltrowane wycieczki
  const [formValue, setFormValue] = useState<string>(""); //wartosc formularza

  dispatcher(actions.fetchTripsFromStore());

  const position = usePosition();

  let filterTripsData: ISingleTripType[] = [];

  //GENERUJE LOSOWE WYCIECZKI
  const generateRandomTrips = () => {
    setSearchedTrips([]);

    let randomId: number;
    const min = 1;
    const max = tripsData.trips.length;

    let i = 0;
    while (i < 5) {
      randomId = Math.floor(Math.random() * (max - min) + min);

      tripsData.trips.forEach((trip: ISingleTripType) => {
        if (trip.id === randomId && !filterTripsData.includes(trip)) {
          filterTripsData.push(trip);
          i++;
        }
      });
    }

    setSearchedTrips(filterTripsData);
    setMode("random");
  };

  //WERYFIKUJE CZY WYCIECZKA JEST W ZASIEGU PODANEGO PROMIENIA (NA PODSTAWIE WLASNOSCI DWOCH OKREGOW)
  const tripInRange = (
    trip: ISingleTripType,
    R: number,
    r: number,
    x1: number,
    x2: number,
    y1: number,
    y2: number
  ) => {
    const S1S2 = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    if (
      //warunek okregow rozlacznych wewnetrznie
      (Math.abs(S1S2) < Math.abs(R - r) &&
        Math.abs(S1S2) > -1 * Math.abs(R - r)) ||
      //warunek przeciecia dwoch okregow
      (Math.abs(S1S2) > R - r &&
        Math.abs(S1S2) < r - R &&
        Math.abs(S1S2) < R + r)
    )
      return true;

    return false;
  };

  const onSearchFormChange = (location: string) => {
    const listCities: string[] = [];
    templateCities.forEach((el: string) => {
      if (el.substr(0, location.length) === location && location.length > 0) {
        listCities.push(el);
      }
    });
    setSuggestedTrips(listCities);
  };

  const onSearchFormSubmit = (location: string, searchMode: string) => {
    if (searchMode === "location") {
      setMode("normal");
      setFormValue(location);

      tripsData.trips.forEach((el: ISingleTripType) => {
        if (el.location === location) filterTripsData.push(el);
      });
    } else if (searchMode === "geo") {
      setMode("normal");
      setFormValue("");

      const r = parseInt(location, 10) / 100;
      const x1 = position.latitude;
      const y1 = position.longitude;

      tripsData.trips.forEach((trip: ISingleTripType) => {
        const R = trip.radius / 100;
        const x2 = trip.lat;
        const y2 = trip.lon;

        if (tripInRange(trip, R, r, x1, x2, y1, y2)) filterTripsData.push(trip);
      });
    } else if (location.length > 0 && !templateCities.includes(location))
      generateRandomTrips();

    setSuggestedTrips([]);
    setSearchedTrips(filterTripsData);
  };

  const handleCityHover = (location: string) => {
    setFormValue(location);
  };

  return (
    <div>
      <SearchForm
        onChange={onSearchFormChange}
        onSubmit={onSearchFormSubmit}
        value={formValue}
      />
      <ListSuggestedTrips
        onCityClick={onSearchFormSubmit}
        onCityHover={handleCityHover}
        suggestedTrips={suggestedTrips}
      />
      <ListTrips trips={searchedTrips} mode={mode} />
    </div>
  );
};

export default TripBrowser;
