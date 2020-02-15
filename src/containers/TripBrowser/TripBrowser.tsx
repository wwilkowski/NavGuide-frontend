import React, { useState, useEffect } from 'react';
import { ISingleTripType, IPosition, ISuggestedPlace } from './types';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './actions';
import { StoreType } from '../../store';
import SearchForm from '../../components/TripBrowser/SearchForm';
import TripInfo from '../../components/TripInfo/TripInfo';

const TripBrowser: React.FC = () => {
  const isLogged = useSelector((state: StoreType) => state.profile.isLoggedIn);
  const tripsData = useSelector((state: StoreType) => state.tripBrowser.trips);
  const suggestedCities = useSelector((state: StoreType) => state.tripBrowser.places);

  const dispatcher = useDispatch();

  const [tripInfoVisible, setTripInfoVisible] = useState<boolean>(false);
  const [tripInfoId, setTripInfoId] = useState<number>(0);
  const [searchedTrips, setSearchedTrips] = useState<ISingleTripType[]>([]);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [formValue, setFormValue] = useState<string>('UMK Wydział Matematyki i Informatyki');
  const [prevFormValue, setPrevFormValue] = useState<string>('');
  const [positionValue, setPositionValue] = useState<IPosition>({
    latitude: 53.01023065,
    longitude: 18.594376006630313,
    radius: 3.0
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
  }, [positionValue.radius, isLogged]);

  useEffect(() => {}, [suggestedCities]);

  useEffect(() => {
    setSearchedTrips(tripsData);
  }, [tripsData]);

  useEffect(() => {
    if (activeTags && activeTags.length) {
      const filteredTrips = tripsData.filter(trip => {
        const equalTags = trip.tags.filter(tag => activeTags.includes(tag.name));
        if (equalTags.length > 0) return true;
        return false;
      });
      setSearchedTrips(filteredTrips);
    } else setSearchedTrips(tripsData);
  }, [activeTags, tripsData]);

  useEffect(() => {
    dispatcher(actions.fetchTagsRequested());
  }, [dispatcher]);

  const handleCityHover = (location: ISuggestedPlace) => {
    //setFormValue(location.name);
  };

  const onSearchFormChange = (location: string) => {
    if (location.length === 0) {
      dispatcher(actions.fetchSuggestedCitiesRequested(location, 0));
    } else {
      dispatcher(actions.fetchSuggestedCitiesRequested(location, 10));
    }
  };

  const onSearchFormSubmit = (location: ISuggestedPlace, radius: number, mode: string) => {
    if (mode === 'normal' && suggestedCities.length > 0 && location.name !== prevFormValue) {
      //ABY ZADZIAŁAŁO TRZEBA POCZEKAĆ AŻ Z API SIE POBIORA WARTOŚCI
      location.coords[0] = suggestedCities[0].coords[0];
      location.coords[1] = suggestedCities[0].coords[1];
      setFormValue(suggestedCities[0].name);
    }

    dispatcher(actions.fetchSuggestedCitiesRequested('', 0));

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
    setPrevFormValue(location.name);
  };

  const changeTripInfoVisible = (tripId: number) => {
    setTripInfoVisible(!tripInfoVisible);
    var i = 0;
    tripsData.forEach((trip: ISingleTripType) => {
      if (trip.id === tripId) setTripInfoId(i);
      i++;
    });
  };

  return (
    <div>
      <SearchForm
        onChange={onSearchFormChange}
        onSubmit={onSearchFormSubmit}
        updateActiveTags={setActiveTags}
        formValue={formValue}
        positionValue={positionValue}
        trips={searchedTrips}
        setPosition={setPositionValue}
        onCityHover={handleCityHover}
        changeTripInfoVisible={changeTripInfoVisible}
      />
      {tripInfoVisible ? <TripInfo tripInformations={tripsData[tripInfoId]} changeTripInfoVisible={changeTripInfoVisible} /> : null}
    </div>
  );
};

export default TripBrowser;

//       {tripInfoVisible ? <TripInfo tripInformations={tripsData[tripInfoId]} changeTripInfoVisible={changeTripInfoVisible} /> : null}{' '}
