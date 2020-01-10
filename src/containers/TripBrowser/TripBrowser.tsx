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
    setSearchedTrips(tripsData);
  }, [tripsData]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    /*const listCities: string[] = [];
    templateCities.forEach((el: string) => {
      if (el.substr(0, location.length) === location && location.length > 0) {
        listCities.push(el);
      }
    });
    setSuggestedTrips(listCities);*/

    const controller = new AbortController();
    const signal = controller.signal;

    function fetchSuggestedTrips() {
      /*const data = await fetch(`https://photon.komoot.de/api/?q=${location}&limit=5`, { signal });
      const json = await data.json();*/

      /*const names: string[] = [];
      json.features.forEach((el: any) => {
        if (!names.includes(el.properties.name)) names.push(el.properties.name);
      });
      console.log(location);
      setSuggestedTrips(names);*/

      fetch(`https://photon.komoot.de/api/?q=${location}&limit=5`, { signal })
        .then(data => data.json())
        .then(json => {
          const names: string[] = [];

          json.features.forEach((el: any) => {
            if (!names.includes(el.properties.name)) names.push(el.properties.name);
          });

          setSuggestedTrips(names);
        })
        .catch(error => console.log(error));
    }

    fetchSuggestedTrips();
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
        />
      </div>
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
