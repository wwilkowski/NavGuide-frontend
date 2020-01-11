import React, { useState, useEffect } from 'react';
import { ISingleTripType, ITag, IPosition } from './types';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './actions';
import { StoreType } from '../../store';
import ListTrips from '../../components/TripBrowser/ListTrips';
import SearchForm from '../../components/TripBrowser/SearchForm';

const templateCities = ['Lipka', 'Torun', 'Warszawa'];

const TripBrowser: React.FC = () => {
  const tripsData = useSelector((state: StoreType) => state.tripBrowser.trips);
  const suggestedCities = useSelector((state: StoreType) => state.tripBrowser.suggestedCities);

  const dispatcher = useDispatch();

  const [mode, setMode] = useState<string>('');
  const [suggestedTrips, setSuggestedTrips] = useState<string[]>([]);
  const [searchedTrips, setSearchedTrips] = useState<ISingleTripType[]>([]);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [formValue, setFormValue] = useState<string>('');
  const [positionValue, setPositionValue] = useState<IPosition>({
    latitude: 53.01023065,
    longitude: 18.594376006630313,
    radius: 0.5
  });

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

  const handleCityHover = (location: string) => {
    setFormValue(location);
  };

  const updateActiveTags = (tagNames: string[]) => {
    setActiveTags(tagNames);
  };

  const onIncreaseRadius = (r: number) => {
    setPositionValue({
      latitude: positionValue.latitude,
      longitude: positionValue.longitude,
      radius: positionValue.radius + r
    });

    const newPositionValue: IPosition = {
      latitude: positionValue.latitude,
      longitude: positionValue.longitude,
      radius: positionValue.radius + r
    };

    onSearchFormSubmit('', newPositionValue, 'geo', activeTags);
  };

  const onSearchFormChange = (location: string) => {
    dispatcher(actions.fetchSuggestedCitiesRequested(location));
  };

  const onSearchFormSubmit = (location: string, position: IPosition, searchMode: string, activeTags: string[]) => {
    if (searchMode === 'location' && templateCities.includes(location)) {
      setMode('normal');
      setFormValue(location);
      dispatcher(actions.fetchCityTripsRequested(location));
    } else if (searchMode === 'geo') {
      setMode('geo');
      setFormValue('');
      setPositionValue({
        latitude: position.latitude,
        longitude: position.longitude,
        radius: position.radius
      });

      dispatcher(actions.fetchGeoTripsRequested(position.latitude, position.longitude, position.radius * 1000));
    } else if (location.length > 0 && !templateCities.includes(location)) {
      setMode('random');

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
          onCityHover={handleCityHover}
        />
      </div>
      <ListTrips trips={searchedTrips} mode={mode} onIncreaseRadius={onIncreaseRadius} />
    </div>
  );
};

export default TripBrowser;
