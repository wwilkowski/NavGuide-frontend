import { FETCH_RANDOM_TRIPS_REQUESTED, FETCH_TAGS_REQUESTED, FETCH_CITY_TRIPS_REQUESTED, FETCH_GEO_TRIPS_REQUESTED } from './constants';
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
        const templateTrip = {
          city: trip.city,
          id: trip.id,
          inSearch: 1,
          lat: trip.lat,
          lon: trip.lon,
          name: trip.name,
          price: trip.price,
          priceType: trip.priceType,
          tags: trip.tags
        };
        templateTrips.trips.push(templateTrip);
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
        const templateTrip = {
          city: trip.city,
          id: trip.id,
          inSearch: 1,
          lat: trip.lat,
          lon: trip.lon,
          name: trip.name,
          price: trip.price,
          priceType: trip.priceType,
          tags: trip.tags
        };
        templateTrips.trips.push(templateTrip);
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
    console.log('RADIUS: ', radius);

    const endpoint = `https://235.ip-51-91-9.eu/guests/offers/geo?lat=${lat}&lon=${lon}&radius=${radius}`;

    const response = yield call(fetch, endpoint);
    const status = response.status;
    const json = yield response.json();
    const templateTrips: types.IMultiTripsType = { trips: [] };

    if (status >= 200 && status <= 300) {
      json.forEach((trip: types.ISingleTripType) => {
        const templateTrip = {
          city: trip.city,
          id: trip.id,
          inSearch: 1,
          lat: trip.lat,
          lon: trip.lon,
          name: trip.name,
          price: trip.price,
          priceType: trip.priceType,
          tags: trip.tags
        };
        templateTrips.trips.push(templateTrip);
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

function* mainSaga() {
  yield takeLatest(FETCH_RANDOM_TRIPS_REQUESTED, fetchRandomTripsFromAPI);
  yield takeLatest(FETCH_CITY_TRIPS_REQUESTED, fetchCityTripsFromAPI);
  yield takeLatest(FETCH_GEO_TRIPS_REQUESTED, fetchGeoTripsFromAPI);
  yield takeLatest(FETCH_TAGS_REQUESTED, fetchTagsFromAPI);
}

export default mainSaga;
