import { FETCH_TRIPS_REQUESTED } from "./constants";
import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from "./actions";
import { IMultiTripsType } from "./types";
import { templateTrips } from "./TemplateTrips";

function* fetchTripsFromStore() {
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

function* mainSaga() {
  yield takeLatest(FETCH_TRIPS_REQUESTED, fetchTripsFromStore);
}

export default mainSaga;
