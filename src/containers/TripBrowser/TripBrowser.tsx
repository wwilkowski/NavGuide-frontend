import React, { useState, useEffect } from 'react';
import { ISingleTripType, ITag, IPosition } from './types';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './actions';
import { StoreType } from '../../store';
import ListTrips from '../../components/TripBrowser/ListTrips';
import ListSuggestedTrips from '../../components/TripBrowser/ListSuggestedTrips';
import SearchForm from '../../components/TripBrowser/SearchForm';

const templateCities = ['Lipka', 'Torun', 'Warszawa'];

const TripBrowser: React.FC = () => {
  const tripsData = useSelector((state: StoreType) => state.tripBrowser.trips);

  const [mode, setMode] = useState<string>('');
  const [suggestedTrips, setSuggestedTrips] = useState<string[]>([]);
  const [searchedTrips, setSearchedTrips] = useState<ISingleTripType[]>([]);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [formValue, setFormValue] = useState<string>('');
  const [positionValue, setPositionValue] = useState<IPosition>({
    latitude: 0,
    longitude: 0,
    radius: 0
  });

  useEffect(() => {
    setSearchedTrips(tripsData);
  }, [tripsData]);

  useEffect(() => {
    if (activeTags.length) {
      setSearchedTrips(
        tripsData.filter(trip => {
          const tripTagsNames = trip.tags.map(tag => tag.name);
          return tripTagsNames.includes(activeTags[0]);
        })
      );
    } else {
      setSearchedTrips(tripsData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tripsData]);

  const dispatcher = useDispatch();
  useEffect(() => {
    dispatcher(actions.fetchTagsRequested());
  }, [dispatcher]);

  const onSearchFormChange = (location: string) => {
    const listCities: string[] = [];
    templateCities.forEach((el: string) => {
      if (el.substr(0, location.length) === location && location.length > 0) {
        listCities.push(el);
      }
    });
    setSuggestedTrips(listCities);
  };

  const onSearchFormSubmit = (location: string, position: IPosition, searchMode: string, activeTags: string[]) => {
    setActiveTags(activeTags);
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

      dispatcher(actions.fetchGeoTripsRequested(position.latitude, position.longitude, position.radius));
    } else if (location.length > 0 && !templateCities.includes(location)) {
      setMode('random');

      dispatcher(actions.fetchRandomTripsRequested());
    }

    //to przeniesiec do useEffect z tripdata
    const filterTripsDataWithTags: ISingleTripType[] = [];
    if (mode !== 'random') {
      tripsData.forEach((trip: ISingleTripType) => {
        const len = activeTags.length;
        let i = 0;
        trip.tags.forEach((tag: ITag) => {
          if (activeTags.includes(tag.name)) i++;
        });

        if (i === len) filterTripsDataWithTags.push(trip);
      });
    }
    setSuggestedTrips([]);
    if (mode !== 'random') {
      setSearchedTrips(filterTripsDataWithTags);
    } else {
      setSearchedTrips(tripsData);
    }
  };

  const handleCityHover = (location: string) => {
    setFormValue(location);
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

  const updateActiveTags = (tagNames: string[]) => {
    console.log('updateActiveTags', tagNames);
    setActiveTags(tagNames);
  };

  return (
    <div>
      <SearchForm
        onChange={onSearchFormChange}
        onSubmit={onSearchFormSubmit}
        updateActiveTags={updateActiveTags}
        formValue={formValue}
        positionValue={positionValue}
      />
      <ListSuggestedTrips
        onCityClick={onSearchFormSubmit}
        onCityHover={handleCityHover}
        suggestedTrips={suggestedTrips}
        activeTags={activeTags}
      />
      <ListTrips trips={searchedTrips} mode={mode} onIncreaseRadius={onIncreaseRadius} />
    </div>
  );
};

export default TripBrowser;
