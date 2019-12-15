import { FETCH_TRIPS_REQUESTED } from "./constants";
import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from "./actions";
import { IMultiTripsType } from "./types";

function* fetchTripsFromStore() {
  try {
    const fetchedTrips = yield call(
      fetch,
      "https://jsonplaceholder.typicode.com/todos"
    );

    yield fetchedTrips.json();

    const templateTrips: IMultiTripsType = {
      trips: [
        {
          id: 1,
          location: "Torun",
          radius: 10,
          begin: "10-02-2020",
          end: "11-02-2020",
          maxPeople: 10,
          price: 300,
          priceType: "pln",
          inSearch: 0
        },
        {
          id: 2,
          location: "Torun",
          radius: 10,
          begin: "10-02-2020",
          end: "11-02-2020",
          maxPeople: 10,
          price: 300,
          priceType: "pln",
          inSearch: 0
        },
        {
          id: 3,
          location: "Torun",
          radius: 10,
          begin: "10-02-2020",
          end: "11-02-2020",
          maxPeople: 10,
          price: 300,
          priceType: "pln",
          inSearch: 0
        },
        {
          id: 4,
          location: "Krakow",
          radius: 10,
          begin: "10-02-2020",
          end: "11-02-2020",
          maxPeople: 10,
          price: 300,
          priceType: "pln",
          inSearch: 0
        },
        {
          id: 5,
          location: "Krakow",
          radius: 10,
          begin: "10-02-2020",
          end: "11-02-2020",
          maxPeople: 10,
          price: 300,
          priceType: "pln",
          inSearch: 0
        }
      ]
    };

    yield put(actions.fetchTripsSuccesed(templateTrips));
  } catch {
    yield put(actions.fetchTripsFailed("Error: can't fetch trips from store"));
  }
}

function* mainSaga() {
  yield takeLatest(FETCH_TRIPS_REQUESTED, fetchTripsFromStore);
}

export default mainSaga;
