import React from "react";
import * as types from "./types";
import { ISingleTripType } from "../../containers/TripBrowser/types";
import { useTranslation } from "react-i18next";

const ListTrips = ({ trips }: types.IListTripsProps) => {
  const { t } = useTranslation();

  const listTrips = trips.map((trip: ISingleTripType) => (
    <>
      <label>
        {t("Trip number")} {trip.id}
      </label>
      <li key={trip.id.toString()}>{trip.location}</li>
      <li key={(trip.id + 1).toString()}>
        {t("Duration")}: {trip.begin} - {trip.end}
      </li>
      <li key={(trip.id + 2).toString()}>
        {t("Number of people (max)")}: {trip.maxPeople}
      </li>
      <li key={(trip.id + 3).toString()}>
        {t("Price")}: {trip.price}
        {trip.priceType}
      </li>
      <li key={(trip.id + 4).toString()}>
        {t("Number of vievs")}: {trip.inSearch}
      </li>
    </>
  ));

  return <ul>{listTrips}</ul>;
};

export default ListTrips;
