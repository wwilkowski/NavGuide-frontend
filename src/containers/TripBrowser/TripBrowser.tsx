import React, { useState, useEffect } from 'react';
import { ISingleTripType, ITag, IPosition, ISuggestedPlace } from './types';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './actions';
import { StoreType } from '../../store';
import SearchForm from '../../components/TripBrowser/SearchForm';
import { useTranslation } from 'react-i18next';

const TripBrowser: React.FC = () => {
  const { t } = useTranslation();

  const isLogged = useSelector((state: StoreType) => state.profile.isLoggedIn);
  const tripsData = useSelector((state: StoreType) => state.tripBrowser.trips);
  const suggestedCities = useSelector((state: StoreType) => state.tripBrowser.places);

  const dispatcher = useDispatch();

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
    onSearchFormSubmit(location, positionValue.radius, 'normal');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const location = {
      name: formValue,
      coords: [positionValue.longitude, positionValue.latitude]
    };
    onSearchFormSubmit(location, positionValue.radius, 'normal');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positionValue.radius]);

  useEffect(() => {}, [suggestedCities]);

  useEffect(() => {
    setSearchedTrips(tripsData);
  }, [tripsData]);

  useEffect(() => {
    if (activeTags && activeTags.length) {
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
    } else setSearchedTrips(tripsData);
  }, [activeTags, tripsData]);

  useEffect(() => {
    dispatcher(actions.fetchTagsRequested());
  }, [dispatcher]);

  const handleCityHover = (location: ISuggestedPlace) => {
    setFormValue(location.name);
  };

  const onSearchFormChange = (location: string) => {
    if (location.length === 0) {
      dispatcher(actions.fetchSuggestedCitiesRequested(location, 0));
    } else {
      dispatcher(actions.fetchSuggestedCitiesRequested(location, 10));
    }
  };

  const onSearchFormSubmit = (location: ISuggestedPlace, radius: number, mode: string) => {
    if (mode === 'normal' && suggestedCities.length > 0 && location.name !== 'UMK Wydział Matematyki i Informatyki') {
      //ABY ZADZIAŁAŁO TRZEBA POCZEKAĆ AŻ Z API SIE POBIORA WARTOŚCI
      location.coords[0] = suggestedCities[0].coords[0];
      location.coords[1] = suggestedCities[0].coords[1];
      setFormValue(suggestedCities[0].name);
      dispatcher(actions.fetchSuggestedCitiesRequested('', 0));
    }

    if (location.name.length) {
      setPositionValue({
        latitude: location.coords[1],
        longitude: location.coords[0],
        radius
      });
      dispatcher(actions.fetchGeoTripsRequested(location.coords[1], location.coords[0], radius * 1000, isLogged));
    } else {
      dispatcher(actions.fetchRandomTripsRequested(isLogged));
    }
  };

  return (
    <div>
      <div className='columns'>
        <SearchForm
          onChange={onSearchFormChange}
          onSubmit={onSearchFormSubmit}
          updateActiveTags={setActiveTags}
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
