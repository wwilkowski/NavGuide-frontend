import {
  FETCH_RANDOM_TRIPS_REQUESTED,
  FETCH_TAGS_REQUESTED,
  FETCH_NAME_TRIPS_REQUESTED,
  FETCH_GEO_TRIPS_REQUESTED,
  FETCH_SUGGESTED_CITIES_REQUESTED,
  FETCH_CLOSEST_TRIPS_REQUESTED,
  FETCH_POPULAR_TRIPS_REQUESTED,
} from './constants';
import { call, put, takeLatest, debounce } from 'redux-saga/effects';
import * as actions from './actions';
import * as types from './types';

const randomTripsEndpoint = 'https://235.ip-51-91-9.eu/guests/offers';
const nameTripsEdnpoint = 'https://235.ip-51-91-9.eu/offers/name?name=';
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

function* fetchNameTripsFromAPI(action: types.IFetchNameTripsRequest) {
  try {
    const name = encodeURI(action.name);

    const response = yield call(fetch, nameTripsEdnpoint + name);
    const status = response.status;
    const json = yield response.json();
    const templateTrips: types.IMultiTripsType = { trips: [] };

    if (status >= 200 && status <= 300) {
      json.forEach((trip: types.ISingleTripType) => {
        templateTrips.trips.push(trip);
      });
      yield put(actions.fetchNameTripsSuccesed(templateTrips));
    } else {
      switch (json.status) {
        default:
          throw new Error('Unexpected problem');
      }
    }
  } catch (error) {
    yield put(actions.fetchNameTripsFailed(`Can't fetch trips by name from API`));
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

function* fetchClosestTripsFromAPI(action: types.IFetchClosestTripsRequest) {
  try {
    const endpoint = `https://235.ip-51-91-9.eu/offers/near?count=${action.count}&lat=${action.latitude}&lon=${action.longitude}`;

    const response = yield call(fetch, endpoint);
    const status = response.status;
    const trips = yield response.json();

    const templateTrips: types.IMultiTripsType = { trips: [] };
    if (status >= 200 && status <= 300) {
      trips.forEach((trip: types.ISingleTripType) => {
        templateTrips.trips.push(trip);
      });
      yield put(actions.fetchClosestTripsSuccessed(templateTrips));
    } else {
      throw new Error();
    }
  } catch (error) {
    console.error(error);
  }
}

function* fetchPopularTripsFromAPI() {
  yield console.error('popular');
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
        suburb: el.address.suburb,
      },
    }));

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

function* mainSaga() {
  //TRIP BROWSER
  yield takeLatest(FETCH_RANDOM_TRIPS_REQUESTED, fetchRandomTripsFromAPI);
  yield takeLatest(FETCH_NAME_TRIPS_REQUESTED, fetchNameTripsFromAPI);
  yield debounce(500, FETCH_GEO_TRIPS_REQUESTED, fetchGeoTripsFromAPI);
  yield takeLatest(FETCH_TAGS_REQUESTED, fetchTagsFromAPI);
  yield takeLatest(FETCH_SUGGESTED_CITIES_REQUESTED, fetchSuggestedCitiesFromNominatimAPI);
  yield takeLatest(FETCH_CLOSEST_TRIPS_REQUESTED, fetchClosestTripsFromAPI);
  yield takeLatest(FETCH_POPULAR_TRIPS_REQUESTED, fetchPopularTripsFromAPI);
}

export default mainSaga;
