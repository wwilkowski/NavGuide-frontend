import { FETCH_TRIPS_REQUESTED, FETCH_TAGS_REQUESTED } from "./constants";
import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from "./actions";
import { IMultiTripsType } from "./types";
import { templateTrips } from "./TemplateTrips";

function* fetchTripsFromAPI() {
  try {
    const fetchedTrips = yield call(
      fetch,
      "https://jsonplaceholder.typicode.com/todos"
    );

    yield fetchedTrips.json();

    yield put(actions.fetchTripsSuccesed(templateTrips));
  } catch {
    yield put(actions.fetchTripsFailed("Error: can't fetch trips from store"));
  }
}

function* fetchTagsFromAPI() {
  try {
    const fetchedTrips = yield call(
      fetch,
      "https://jsonplaceholder.typicode.com/todos"
    );

    yield fetchedTrips.json();

    const tags = [
      {
        id: 0,
        name: "tag0"
      },
      {
        id: 1,
        name: "tag1"
      },
      {
        id: 2,
        name: "tag2"
      },
      {
        id: 3,
        name: "tag3"
      },
      {
        id: 4,
        name: "tag4"
      }
    ];

    yield put(actions.fetchTagsSuccesed(tags));
  } catch {
    yield put(actions.fetchTagsFailed("Error: can't fetch tags from store"));
  }
}

function* mainSaga() {
  yield takeLatest(FETCH_TRIPS_REQUESTED, fetchTripsFromAPI);
  yield takeLatest(FETCH_TAGS_REQUESTED, fetchTagsFromAPI);
}

export default mainSaga;
