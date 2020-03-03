import {
  FETCH_RANDOM_TRIPS_REQUESTED,
  FETCH_TAGS_REQUESTED,
  FETCH_CITY_TRIPS_REQUESTED,
  FETCH_GEO_TRIPS_REQUESTED,
  FETCH_SUGGESTED_CITIES_REQUESTED,
  FETCH_GUIDE_PROFILE_REQUESTED,
  FETCH_GUIDE_PROFILE_DATA_REQUESTED
} from './constants';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as types from './types';
import { showNotification } from '../../helpers/notification';
import i18n from '../../locales/i18n';
import { getToken } from '../../helpers/tokenCookie';

const randomTripsEndpoint = 'https://235.ip-51-91-9.eu/guests/offers';
const cityTripsEdnpoint = 'https://235.ip-51-91-9.eu/guests/offers/city?name=';
const tagsEndpoint = 'https://235.ip-51-91-9.eu/tags';

function* fetchRandomTripsFromAPI() {
  try {
    const response = yield call(fetch, randomTripsEndpoint);
    const status = response.status;
    const json = yield response.json();

    const templateTrips: types.IMultiTripsType = { trips: [] };

    if (status >= 200 && status <= 300) {
      json.forEach((trip: types.ISingleTripType) => {
        templateTrips.trips.push(trip);
      });

      yield put(actions.fetchRandomTripsSuccesed(templateTrips));
    } else {
      switch (json.status) {
        default:
          throw new Error('Unexpected problem');
      }
    }
  } catch (error) {
    yield put(actions.fetchRandomTripsFailed(`Can't fetch random trips from API`));
  }
}

function* fetchCityTripsFromAPI(action: types.IFetchCityTripsRequest) {
  try {
    const response = yield call(fetch, cityTripsEdnpoint + action.city);
    const status = response.status;
    const json = yield response.json();
    const templateTrips: types.IMultiTripsType = { trips: [] };

    if (status >= 200 && status <= 300) {
      json.forEach((trip: types.ISingleTripType) => {
        templateTrips.trips.push(trip);
      });
      yield put(actions.fetchCityTripsSuccesed(templateTrips));
    } else {
      switch (json.status) {
        default:
          throw new Error('Unexpected problem');
      }
    }
  } catch (error) {
    yield put(actions.fetchCityTripsFailed(`Can't fetch city trips from API`));
  }
}

function* fetchGeoTripsFromAPI(action: types.IFetchGeoTripsRequest) {
  try {
    const lat = action.lat;
    const lon = action.lon;
    const radius = action.radius;

    const endpointGuest = `https://235.ip-51-91-9.eu/guests/offers/geo?lat=${lat}&lon=${lon}&radius=${radius}`;
    const endpoint = `https://235.ip-51-91-9.eu/offers/geo?lat=${lat}&lon=${lon}&radius=${radius}`;

    const response = action.isLogged ? yield call(fetch, endpoint) : yield call(fetch, endpointGuest);
    const status = response.status;
    const json = yield response.json();
    const templateTrips: types.IMultiTripsType = { trips: [] };

    if (status >= 200 && status <= 300) {
      json.forEach((trip: types.ISingleTripType) => {
        templateTrips.trips.push(trip);
      });
      yield put(actions.fetchGeoTripsSuccesed(templateTrips));
    } else {
      switch (json.status) {
        default:
          throw new Error('Unexpected problem');
      }
    }
  } catch (error) {
    yield put(actions.fetchGeoTripsFailed(`Can't fetch geo trips from API`));
  }
}

function* fetchTagsFromAPI() {
  try {
    const response = yield call(fetch, tagsEndpoint);

    const tags = yield response.json();

    yield put(actions.fetchTagsSuccesed(tags));
  } catch {
    yield put(actions.fetchTagsFailed("Error: can't fetch tags from store"));
  }
}

function* fetchSuggestedCitiesFromNominatimAPI(action: types.IFetchSuggestedCitiesRequest) {
  try {
    const location = action.location.replace(' ', '+');

    const response = yield call(
      fetch,
      `https://nominatim.openstreetmap.org/?addressdetails=1&q=${location}&format=json&limit=10&countrycodes=pl`
    );
    const suggestedCities = yield response.json();

    var filteredSuggestedCities = suggestedCities.map((el: any) => ({
      displayName: el.display_name,
      coords: [el.lon, el.lat],
      class: el.class,
      type: el.type,
      address: {
        type: el.address.bakery,
        cityDistrict: el.address.city_district,
        country: el.address.country,
        countryCode: el.address.country_code,
        footway: el.address.footway,
        neighbourhood: el.address.neighbourhood,
        postcode: el.address.postcode,
        state: el.address.state,
        suburb: el.address.suburb
      }
    }));

    console.log(filteredSuggestedCities);
    // filteredSuggestedCities = filteredSuggestedCities.filter((el: types.ISuggestedPlace) => {
    //   if (el.address.countryCode === 'pl') return el;
    // });

    const seen = new Set();
    filteredSuggestedCities = filteredSuggestedCities.filter((el: types.ISuggestedPlace) => {
      const duplicate = seen.has(el.displayName);
      seen.add(el.displayName);
      return !duplicate;
    });
    yield put(actions.fetchSuggestedCitiesSuccesed(filteredSuggestedCities));
  } catch {
    yield put(actions.fetchSuggestedCitiesFailed("Error: can't fetch suggested cities from Photon API"));
  }
}

function* fetchGuideProfileFromAPI(action: types.IFetchGuideProfileRequest) {
  //dokonczyc
  yield console.log('guide');
}

function* fetchGuideProfileDataFromAPI(action: types.IFetchGuideProfileRequest) {
  const endpoint = `https://235.ip-51-91-9.eu/users/${action.id}`;

  try {
    const response = yield call(fetch, endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      }
    });
    const user = yield response.json();
    if (response.status >= 200 && response.status <= 300) {
      yield put(actions.fetchGuideProfileDataSuccessed(user));
    } else {
      throw new Error();
    }
  } catch (error) {
    yield put(actions.fetchGuideProfileDataFailed('Error while User Profile request'));
    showNotification('danger', i18n.t('Something goes wrong'), i18n.t('Try again later!'));
  }
}

function* mainSaga() {
  yield takeLatest(FETCH_RANDOM_TRIPS_REQUESTED, fetchRandomTripsFromAPI);
  yield takeLatest(FETCH_CITY_TRIPS_REQUESTED, fetchCityTripsFromAPI);
  yield takeLatest(FETCH_GEO_TRIPS_REQUESTED, fetchGeoTripsFromAPI);
  yield takeLatest(FETCH_TAGS_REQUESTED, fetchTagsFromAPI);
  yield takeLatest(FETCH_SUGGESTED_CITIES_REQUESTED, fetchSuggestedCitiesFromNominatimAPI);
  yield takeLatest(FETCH_GUIDE_PROFILE_REQUESTED, fetchGuideProfileFromAPI);
  yield takeLatest(FETCH_GUIDE_PROFILE_DATA_REQUESTED, fetchGuideProfileDataFromAPI);
}

export default mainSaga;
