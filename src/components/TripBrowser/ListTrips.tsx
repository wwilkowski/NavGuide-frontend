import React from "react";
import * as types from "./types";
import { ISingleTripType } from "../../containers/TripBrowser/types";
import { useTranslation } from "react-i18next";

const ListTrips = ({ trips, mode }: types.IListTripsProps) => {
  const { t } = useTranslation();

  return (
    <>
      {mode === "random" ? <p>{t("No trips in this place")}</p> : null}
      <ul>
        {trips.map((trip: ISingleTripType) => (
          <li key={trip.id}>
            <p>
              {t("Trip number") + " "}
              {trip.id}
            </p>
            <p>{trip.location}</p>
            <p>
              {" "}
              {t("Duration")}: {trip.begin} - {trip.end}
            </p>
            <p>
              {" "}
              {t("Number of people (max)")}: {trip.maxPeople}
            </p>
            <p>
              {t("Price")}: {trip.price}
              {trip.priceType}
            </p>
            <p>
              {" "}
              {t("Number of vievs")}: {trip.inSearch}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ListTrips;
