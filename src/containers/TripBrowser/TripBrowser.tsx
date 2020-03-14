import React, { useState, useEffect } from 'react';
import { ISingleTripType, IPosition, ISuggestedPlace } from './types';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './actions';
import * as actionsProfile from '../../containers/GuideProfile/actions';
import { StoreType } from '../../store';
import SearchForm from '../../components/TripBrowser/SearchForm';
import TripInfo from '../../components/TripInfo/TripInfo';

const TripBrowser: React.FC = () => {
  const isLogged = useSelector((state: StoreType) => state.profile.isLoggedIn);
  const tripsData = useSelector((state: StoreType) => state.tripBrowser.trips);
  const suggestedCities = useSelector((state: StoreType) => state.tripBrowser.places);
  const guideProfileData = useSelector((state: StoreType) => state.guideProfile.guideProfileData);
  const guideProfile = useSelector((state: StoreType) => state.guideProfile.guideProfile);

  const dispatcher = useDispatch();

  const [searchMode, setSearchMode] = useState<string>('');
  const [tripInfoVisible, setTripInfoVisible] = useState<boolean>(false);
  const [tripInfoId, setTripInfoId] = useState<number>(0);
  const [searchedTrips, setSearchedTrips] = useState<ISingleTripType[]>([]);
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
    if (searchMode === 'name' && tripsData.length > 0) {
      setPositionValue({
        latitude: tripsData[0].lat,
        longitude: tripsData[0].lon,
        radius: 1.0
      });
    }
  }, [tripsData, searchMode]);

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
    onSearchFormSubmit(location, positionValue.radius, 'normal', new Date());
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
    onSearchFormSubmit(location, positionValue.radius, 'normal', new Date());
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
    if (mode === 'geo' && suggestedCities.length > 0 && location.displayName !== prevFormValue) {
      setSearchMode('geo');
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
      setSearchMode('name');
      dispatcher(actions.fetchNameTripsRequested(location.displayName));
    }
  };

  const changeTripInfoVisible = (tripId: number) => {
    setTripInfoVisible(!tripInfoVisible);
    let id = 0;
    let i = 0;
    tripsData.forEach((trip: ISingleTripType) => {
      if (trip.id === tripId) {
        setTripInfoId(i);
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
        trips={searchedTrips}
        setPosition={setPositionValue}
        onCityHover={handleCityHover}
        onCityClick={handleCityClick}
        tripInfoVisible={tripInfoVisible}
        changeTripInfoVisible={changeTripInfoVisible}
      />
      {tripInfoVisible ? (
        <TripInfo
          tripInformations={tripsData[tripInfoId]}
          guideProfile={guideProfile}
          guideProfileData={guideProfileData}
          changeTripInfoVisible={changeTripInfoVisible}
        />
      ) : null}
    </div>
  );
};

export default TripBrowser;
