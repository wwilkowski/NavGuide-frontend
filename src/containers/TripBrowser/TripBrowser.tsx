import React, { useState, useEffect } from 'react';
import { ISingleTripType, ITag, IPosition, ISuggestedPlace } from './types';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './actions';
import { StoreType } from '../../store';
import ListTrips from '../../components/TripBrowser/ListTrips';
import SearchForm from '../../components/TripBrowser/SearchForm';

const TripBrowser: React.FC = () => {
  const tripsData = useSelector((state: StoreType) => state.tripBrowser.trips);
  const suggestedCities = useSelector((state: StoreType) => state.tripBrowser.places);

  const dispatcher = useDispatch();

  const [mode, setMode] = useState<string>('normal');
  const [suggestedTrips, setSuggestedTrips] = useState<ISuggestedPlace[]>([]);
  const [searchedTrips, setSearchedTrips] = useState<ISingleTripType[]>([]);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [formValue, setFormValue] = useState<string>('UMK Wydział Matematyki i Informatyki');
  const [positionValue, setPositionValue] = useState<IPosition>({
    latitude: 53.01023065,
    longitude: 18.594376006630313,
    radius: 0.5
  });

  useEffect(() => {
    const location = {
      name: formValue,
      coords: [positionValue.longitude, positionValue.latitude]
    };
    onSearchFormSubmit(location, positionValue.radius);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const location = {
      name: formValue,
      coords: [positionValue.longitude, positionValue.latitude]
    };
    onSearchFormSubmit(location, positionValue.radius);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positionValue.radius]);

  useEffect(() => {
    setSuggestedTrips(suggestedCities);
  }, [suggestedCities]);

  useEffect(() => {
    setSearchedTrips(tripsData);
  }, [tripsData]);

  useEffect(() => {
    if (activeTags.length) {
      const filterTripsDataWithTags: ISingleTripType[] = [];
      let iTag = 0;
      tripsData.forEach((trip: ISingleTripType) => {
        trip.tags.forEach((tag: ITag) => {
          if (activeTags.includes(tag.name)) {
            iTag++;
          }
        });
        if (iTag > 0) filterTripsDataWithTags.push(trip);
      });

      setSearchedTrips(filterTripsDataWithTags);
    }
    setSuggestedTrips([]);
  }, [activeTags, tripsData]);

  useEffect(() => {
    dispatcher(actions.fetchTagsRequested());
  }, [dispatcher]);

  const handleCityHover = (location: ISuggestedPlace) => {
    setFormValue(location.name);
  };

  const updateActiveTags = (tagNames: string[]) => {
    setActiveTags(tagNames);
  };

  const onSearchFormChange = (location: string) => {
    dispatcher(actions.fetchSuggestedCitiesRequested(location));
  };

  const onSearchFormSubmit = (location: ISuggestedPlace, radius: number) => {
    if (location.name.length) {
      setPositionValue({
        latitude: location.coords[1],
        longitude: location.coords[0],
        radius
      });
      dispatcher(actions.fetchGeoTripsRequested(location.coords[1], location.coords[0], radius * 1000));
    } else {
      dispatcher(actions.fetchRandomTripsRequested());
    }
  };

  return (
    <div>
      <div className='columns'>
        <SearchForm
          onChange={onSearchFormChange}
          onSubmit={onSearchFormSubmit}
          updateActiveTags={updateActiveTags}
          formValue={formValue}
          positionValue={positionValue}
          trips={searchedTrips}
          setPosition={setPositionValue}
          onCityHover={handleCityHover}
        />
      </div>
    </div>
  );
};

export default TripBrowser;
