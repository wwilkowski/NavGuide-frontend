import React, { useState, useEffect } from 'react';
import { ISingleTripType, IPosition, ISuggestedPlace } from './types';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './actions';
import { StoreType } from '../../store';
import SearchForm from '../../components/TripBrowser/SearchForm';
import { ListMode } from '../../components/TripBrowser/types';

const TripBrowser: React.FC = () => {
  const isLogged = useSelector((state: StoreType) => state.profile.isLoggedIn);
  const tripsData = useSelector((state: StoreType) => state.tripBrowser.trips);
  const suggestedCities = useSelector((state: StoreType) => state.tripBrowser.places);

  const dispatcher = useDispatch();

  const [beginDate, setBeginDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [filteredTrips, setFilteredTrips] = useState<ISingleTripType[]>([]);
  const [activeTags, setActiveTags] = useState<number[]>([]);
  const [formValue, setFormValue] = useState<string>('UMK Wydział Matematyki i Informatyki');
  const [prevFormValue, setPrevFormValue] = useState<string>('');
  const [positionValue, setPositionValue] = useState<IPosition>({
    latitude: 53.01023065,
    longitude: 18.594376006630313,
    radius: 1.0,
  });

  useEffect(() => {
    const defaultBegin = new Date();
    defaultBegin.setDate(defaultBegin.getDate());
    const defaultEnd = new Date();
    defaultEnd.setDate(defaultEnd.getDate() + 30);

    const location = {
      displayName: formValue,
      coords: [positionValue.longitude, positionValue.latitude],
      class: '',
      type: '',
      address: {
        type: '',
        cityDistrict: '',
        country: '',
        countryCode: '',
        footway: '',
        neighbourhood: '',
        postcode: '',
        state: '',
        suburb: '',
      },
    };

    onSearchFormSubmit(location, positionValue.radius, 'normal', endDate ? endDate : defaultEnd, beginDate ? beginDate : defaultBegin);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const defaultBegin = new Date();
    defaultBegin.setDate(defaultBegin.getDate());
    const defaultEnd = new Date();
    defaultEnd.setDate(defaultEnd.getDate() + 30);

    const location = {
      displayName: formValue,
      coords: [positionValue.longitude, positionValue.latitude],
      class: '',
      type: '',
      address: {
        type: '',
        cityDistrict: '',
        country: '',
        countryCode: '',
        footway: '',
        neighbourhood: '',
        postcode: '',
        state: '',
        suburb: '',
      },
    };
    onSearchFormSubmit(location, positionValue.radius, 'geo', endDate ? endDate : defaultEnd, beginDate ? beginDate : defaultBegin);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positionValue.radius, isLogged]);

  useEffect(() => {
    dispatcher(actions.fetchTagsRequested());
  }, [dispatcher]);

  useEffect(() => {
    if (activeTags && activeTags.length) {
      let tmp = tripsData.filter((trip) => {
        const equalTags = trip.tags.filter((tag) => {
          return activeTags.includes(tag.id);
        });
        if (equalTags.length > 0) return true;
        return false;
      });
      if (beginDate && isLogged && endDate) {
        tmp = tmp.filter((trip: ISingleTripType) => {
          const tripBegin = new Date(trip.begin);
          const tripEnd = new Date(trip.end);
          if (
            (beginDate.getTime() >= tripBegin.getTime() && beginDate.getTime() <= tripEnd.getTime()) ||
            (endDate.getTime() >= tripBegin.getTime() && endDate.getTime() <= tripEnd.getTime())
          ) {
            return true;
          }
          return false;
        });
      }
      setFilteredTrips(tmp);
    } else if (beginDate && endDate && isLogged && tripsData) {
      let tmp = [];
      tmp = tripsData.filter((trip: ISingleTripType) => {
        const tripBegin = new Date(trip.begin);
        const tripEnd = new Date(trip.end);

        let tmpDate = beginDate;
        while (tmpDate.getTime() <= endDate.getTime()) {
          if (tmpDate.getTime() >= tripBegin.getTime() && tmpDate.getTime() <= tripEnd.getTime()) return true;
          tmpDate.setDate(tmpDate.getDate() + 1);
        }
        return false;
      });

      setFilteredTrips(tmp);
    } else if (!isLogged) setFilteredTrips(tripsData);
  }, [activeTags, beginDate, endDate, isLogged, tripsData]);

  const handleCityHover = (location: ISuggestedPlace) => {
    //setFormValue(location.name);
  };

  const handleCityClick = () => {
    dispatcher(actions.fetchSuggestedCitiesRequested('', 0));
  };

  const onSearchFormChange = (location: string) => {
    setFormValue(location);
    if (location.length === 0) {
      dispatcher(actions.fetchSuggestedCitiesRequested(location, 0));
    } else {
      dispatcher(actions.fetchSuggestedCitiesRequested(location, 10));
    }
  };

  const onSearchFormSubmit = (location: ISuggestedPlace, radius: number, mode: string, end: Date, begin: Date) => {
    console.log(location);
    setEndDate(end);
    setBeginDate(begin);
    if (mode === 'geo' && suggestedCities.length > 0 && location.displayName !== prevFormValue) {
      location.coords[0] = suggestedCities[0].coords[0];
      location.coords[1] = suggestedCities[0].coords[1];
      setFormValue(suggestedCities[0].displayName);

      setFormValue(location.displayName);
      if (location.displayName.length) {
        setPositionValue({
          latitude: location.coords[1],
          longitude: location.coords[0],
          radius,
        });
        dispatcher(actions.fetchGeoTripsRequested(location.coords[1], location.coords[0], radius * 1000, isLogged));
      }
      setPrevFormValue(location.displayName);
    } else if (mode === 'name') {
      console.log(location.displayName);
      dispatcher(actions.fetchNameTripsRequested(location.displayName));
    } else {
      setFormValue(location.displayName);
      setPositionValue({
        latitude: location.coords[1],
        longitude: location.coords[0],
        radius,
      });
      dispatcher(actions.fetchGeoTripsRequested(location.coords[1], location.coords[0], radius * 1000, isLogged));
    }
  };

  const getTrips = (mode: ListMode) => {
    if (mode === ListMode.closest) {
      dispatcher(actions.fetchClosestTripsRequested(3, positionValue.latitude, positionValue.longitude));
    } else if (mode === ListMode.popular) {
      dispatcher(actions.fetchPopularTripsRequested());
    }
  };

  return (
    <div>
      <SearchForm
        onChange={onSearchFormChange}
        onSubmit={onSearchFormSubmit}
        getTrips={getTrips}
        updateActiveTags={setActiveTags}
        formValue={formValue}
        positionValue={positionValue}
        trips={filteredTrips}
        setPosition={setPositionValue}
        onCityHover={handleCityHover}
        onCityClick={handleCityClick}
      />
    </div>
  );
};

export default TripBrowser;
