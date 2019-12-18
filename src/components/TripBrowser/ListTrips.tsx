import React from "react";
import * as types from "./types";
import { ISingleTripType } from "../../containers/TripBrowser/types";
import { useTranslation } from "react-i18next";

const ListTrips = ({ trips, mode }: types.IListTripsProps) => {
  const { t } = useTranslation();

  const listTrips = trips.map((trip: ISingleTripType) => (
    <>
      <label>
        {t("Trip number")} {trip.id}
      </label>
      <li key={trip.id.toString() + "location"}>{trip.location}</li>
      <li key={(trip.id).toString() + "duration"}>
        {t("Duration")}: {trip.begin} - {trip.end}
      </li>
      <li key={(trip.id).toString() + "maxPeople"}>
        {t("Number of people (max)")}: {trip.maxPeople}
      </li>
      <li key={(trip.id).toString() + "price"}>
        {t("Price")}: {trip.price}
        {trip.priceType}
      </li>
      <li key={(trip.id).toString() + "numberOFVievs"}>
        {t("Number of vievs")}: {trip.inSearch}
      </li>
    </>
  ));

  return (
    <>
      {mode === "random" ? <p>{t("No trips in this place")}</p> : null}
      <ul>{listTrips}</ul>
    </>
  );
};

export default ListTrips;
