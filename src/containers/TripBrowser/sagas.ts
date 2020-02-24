import {
  FETCH_RANDOM_TRIPS_REQUESTED,
  FETCH_TAGS_REQUESTED,
  FETCH_CITY_TRIPS_REQUESTED,
  FETCH_GEO_TRIPS_REQUESTED,
  FETCH_SUGGESTED_CITIES_REQUESTED,
  FETCH_GUIDE_PROFILE_REQUESTED
} from './constants';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as types from './types';

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

function* fetchSuggestedCitiesFromPhotonAPI(action: types.IFetchSuggestedCitiesRequest) {
  try {
    const response = yield call(fetch, `https://photon.komoot.de/api/?q=${action.location}&limit=${action.number}`);
    const suggestedCities = yield response.json();
    const places = suggestedCities.features.map((el: any) => {
      return {
        name: el.properties.name,
        coords: el.geometry.coordinates
      };
    });
    yield put(actions.fetchSuggestedCitiesSuccesed(places));
  } catch {
    yield put(actions.fetchSuggestedCitiesFailed("Error: can't fetch suggested cities from Photon API"));
  }
}

function* fetchGuideProfileFromAPI(action: types.IFetchGuideProfileRequest) {
  //dokonczyc
}

function* mainSaga() {
  yield takeLatest(FETCH_RANDOM_TRIPS_REQUESTED, fetchRandomTripsFromAPI);
  yield takeLatest(FETCH_CITY_TRIPS_REQUESTED, fetchCityTripsFromAPI);
  yield takeLatest(FETCH_GEO_TRIPS_REQUESTED, fetchGeoTripsFromAPI);
  yield takeLatest(FETCH_TAGS_REQUESTED, fetchTagsFromAPI);
  yield takeLatest(FETCH_SUGGESTED_CITIES_REQUESTED, fetchSuggestedCitiesFromPhotonAPI);
  yield takeLatest(FETCH_GUIDE_PROFILE_REQUESTED, fetchGuideProfileFromAPI);
}

export default mainSaga;
