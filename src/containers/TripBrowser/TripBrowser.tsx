import React, { useState } from "react";
import { ISingleTripType, usePosition, ITag, IPosition } from "./types";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./actions";
import { StoreType } from "../../store";
import SearchForm from "../../components/TripBrowser/SearchForm";
import ListTrips from "../../components/TripBrowser/ListTrips";
import ListSuggestedTrips from "../../components/TripBrowser/ListSuggestedTrips";
import { templateCities } from "./TemplateTrips";

const TripBrowser: React.FC = () => {
  const tripsData = useSelector((state: StoreType) => state.tripBrowser.trips);
  const tagsData = useSelector((state: StoreType) => state.tripBrowser.tags);
  const dispatcher = useDispatch();

  const [mode, setMode] = useState<string>(""); 
  const [suggestedTrips, setSuggestedTrips] = useState<string[]>([]);
  const [searchedTrips, setSearchedTrips] = useState<ISingleTripType[]>([]); 
  const [formValue, setFormValue] = useState<string>("");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [positionValue, setPositionValue] = useState<IPosition>({
    latitude: 0,
    longitude: 0,
    radius: 0
  });

  //const position = usePosition();

  let filterTripsData: ISingleTripType[] = [];

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

  const setupDataFromAPI = () => {
    dispatcher(actions.fetchTripsRequested());
    dispatcher(actions.fetchTagsRequested());
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

  const onSearchFormSubmit = (
    location: string,
    position: IPosition,
    searchMode: string,
    activeTags: string[]
  ) => {
    setActiveTags(activeTags);
    let mode = "";
    if (searchMode === "location" && templateCities.includes(location)) {
      mode = "normal";
      setMode(mode);
      setFormValue(location);

      tripsData.forEach((el: ISingleTripType) => {
        if (el.location === location) filterTripsData.push(el);
      });
    } else if (searchMode === "geo") {
      setPositionValue({
        latitude: position.latitude,
        longitude: position.longitude,
        radius: position.radius
      });

      mode = "geo";
      setMode(mode);
      setFormValue("");

      const r = position.radius / 100;
      const x1 = position.latitude;
      const y1 = position.longitude;

      tripsData.forEach((trip: ISingleTripType) => {
        const R = trip.radius / 100;
        const x2 = trip.lat;
        const y2 = trip.lon;

        if (tripInRange(trip, R, r, x1, x2, y1, y2)) filterTripsData.push(trip);
      });
    } else if (location.length > 0 && !templateCities.includes(location)) {
      mode = "random";
      setMode(mode);
      let randomId: number;
      const min = 1;
      const max = tripsData.length;

      let i = 0;
      while (i < 5) {
        randomId = Math.floor(Math.random() * (max - min) + min);

        tripsData.forEach((trip: ISingleTripType) => {
          if (trip.id === randomId && !filterTripsData.includes(trip)) {
            filterTripsData.push(trip);
            i++;
          }
        });
      }
    }

    const filterTripsDataWithTags: ISingleTripType[] = [];
    if (mode != "random") {
      filterTripsData.forEach((trip: ISingleTripType) => {
        const len = activeTags.length;
        let i = 0;
        trip.tags.forEach((tag: ITag) => {
          if (activeTags.includes(tag.name)) i++;
        });

        if (i === len) filterTripsDataWithTags.push(trip);
      });
    }

    setSuggestedTrips([]);
    mode != "random"
      ? setSearchedTrips(filterTripsDataWithTags)
      : setSearchedTrips(filterTripsData);
  };

  const handleCityHover = (location: string) => {
    setFormValue(location);
  };

  const onIncreaseRadius = (r: number) => {
    setPositionValue({
      latitude: positionValue.latitude,
      longitude: positionValue.longitude,
      radius: r
    });

    console.log(positionValue);
    onSearchFormSubmit("", positionValue, "geo", activeTags);
  };

  const updateActiveTags = (tagNames: string[]) => {
    setActiveTags(tagNames);
  };

  return (
    <div>
      <button onClick={setupDataFromAPI}>SETUP DATA</button>
      <SearchForm
        onChange={onSearchFormChange}
        onSubmit={onSearchFormSubmit}
        formValue={formValue}
        positionValue={positionValue}
        tagsData={tagsData}
        updateActiveTags={updateActiveTags}
      />
      <ListSuggestedTrips
        onCityClick={onSearchFormSubmit}
        onCityHover={handleCityHover}
        suggestedTrips={suggestedTrips}
        activeTags={activeTags}
      />
      <ListTrips
        trips={searchedTrips}
        mode={mode}
        onIncreaseRadius={onIncreaseRadius}
      />
    </div>
  );
};

export default TripBrowser;


//tagi i setPositionValue