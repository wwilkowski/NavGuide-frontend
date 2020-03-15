import React, { useState, useEffect } from 'react';
import { ISingleTripType, IPosition, ISuggestedPlace } from './types';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './actions';
import * as actionsProfile from '../../containers/GuideProfile/actions';
import { StoreType } from '../../store';
import SearchForm from '../../components/TripBrowser/SearchForm';

const TripBrowser: React.FC = () => {
  const isLogged = useSelector((state: StoreType) => state.profile.isLoggedIn);
  const tripsData = useSelector((state: StoreType) => state.tripBrowser.trips);
  const suggestedCities = useSelector((state: StoreType) => state.tripBrowser.places);

  const dispatcher = useDispatch();

  const [endDate, setEndDate] = useState<Date>();
  const [tripInfoVisible, setTripInfoVisible] = useState<boolean>(false);
  const [searchedTrips, setSearchedTrips] = useState<ISingleTripType[]>([]);
  const [tripInfoId, setTripInfoId] = useState<number>(0);
  const [filteredTrips, setFilteredTrips] = useState<ISingleTripType[]>([]);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [formValue, setFormValue] = useState<string>('UMK Wydział Matematyki i Informatyki');
  const [prevFormValue, setPrevFormValue] = useState<string>('');
  const [positionValue, setPositionValue] = useState<IPosition>({
    latitude: 53.01023065,
    longitude: 18.594376006630313,
    radius: 1.0
  });

  useEffect(() => {
    if (sessionStorage.getItem('backFromGuideProfile')) setTripInfoVisible(true);
    sessionStorage.removeItem('backFromGuideProfile');
  }, []);

  useEffect(() => {
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
        suburb: ''
      }
    };
    onSearchFormSubmit(location, positionValue.radius, 'normal', endDate ? endDate : new Date());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
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
        suburb: ''
      }
    };
    onSearchFormSubmit(location, positionValue.radius, 'normal', endDate ? endDate : new Date());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positionValue.radius, isLogged]);

  useEffect(() => {}, [suggestedCities]);

  useEffect(() => {
    if (activeTags && activeTags.length) {
      const tmp = tripsData.filter(trip => {
        const equalTags = trip.tags.filter(tag => activeTags.includes(tag.name));
        if (equalTags.length > 0) return true;
        return false;
      });
      setFilteredTrips(tmp);
    } else if (endDate && isLogged) {
      let tmp;

      tmp = tripsData.filter((trip: ISingleTripType) => {
        if (new Date(trip.end) <= endDate) {
          return trip;
        }
        return false;
      });
      setFilteredTrips(tmp);
    } else if (!isLogged) setFilteredTrips(tripsData);
  }, [activeTags, tripsData]);

  useEffect(() => {
    dispatcher(actions.fetchTagsRequested());
  }, [dispatcher]);

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

  const onSearchFormSubmit = (location: ISuggestedPlace, radius: number, mode: string, end: Date) => {
    setEndDate(end);
    if (mode === 'geo' && suggestedCities.length > 0 && location.displayName !== prevFormValue) {
      location.coords[0] = suggestedCities[0].coords[0];
      location.coords[1] = suggestedCities[0].coords[1];
      setFormValue(suggestedCities[0].displayName);

      setFormValue(location.displayName);
      if (location.displayName.length) {
        setPositionValue({
          latitude: location.coords[1],
          longitude: location.coords[0],
          radius
        });
        dispatcher(actions.fetchGeoTripsRequested(location.coords[1], location.coords[0], radius * 1000, isLogged));
      } else {
        dispatcher(actions.fetchRandomTripsRequested(isLogged));
      }
      setPrevFormValue(location.displayName);
    } else if (mode === 'name') {
      dispatcher(actions.fetchNameTripsRequested(location.displayName));
    } else {
      setFormValue(location.displayName);
      if (location.displayName.length) {
        setPositionValue({
          latitude: location.coords[1],
          longitude: location.coords[0],
          radius
        });
        dispatcher(actions.fetchGeoTripsRequested(location.coords[1], location.coords[0], radius * 1000, isLogged));
      } else {
        dispatcher(actions.fetchRandomTripsRequested(isLogged));
      }
      setPrevFormValue(location.displayName);
    }
  };

  const changeTripInfoVisible = (tripId: number) => {
    setTripInfoVisible(!tripInfoVisible);
    let id = 0;
    let i = 0;
    tripsData.forEach((trip: ISingleTripType) => {
      if (trip.id === tripId) {
        id = i;
      }
      i++;
    });

    if (!tripInfoVisible && isLogged) {
      dispatcher(actionsProfile.fetchGuideProfileRequested(tripsData[id].owner.guideId));
      dispatcher(actionsProfile.fetchGuideProfileDataRequest(tripsData[id].owner.userId));
    }
  };

  return (
    <div>
      <SearchForm
        onChange={onSearchFormChange}
        onSubmit={onSearchFormSubmit}
        updateActiveTags={setActiveTags}
        formValue={formValue}
        positionValue={positionValue}
        trips={filteredTrips}
        setPosition={setPositionValue}
        onCityHover={handleCityHover}
        onCityClick={handleCityClick}
        tripInfoVisible={tripInfoVisible}
        changeTripInfoVisible={changeTripInfoVisible}
      />
      {/* {tripInfoVisible ? (
        <TripInfo
          tripInformations={tripsData[tripInfoId]}
          guideProfile={guideProfile}
          guideProfileData={guideProfileData}
          changeTripInfoVisible={changeTripInfoVisible}
        />
      ) : null} */}
    </div>
  );
};

export default TripBrowser;
