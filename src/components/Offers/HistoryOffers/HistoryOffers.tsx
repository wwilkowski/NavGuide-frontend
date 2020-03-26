import React, { useState, useEffect } from 'react';
import { IProfileHistoryOffersProps } from '../../../containers/Offers/types';
import { ISingleTripType, IEndedSingleTripType } from '../../../containers/TripBrowser/types';
import TripListElement from '../../TripBrowser/TripListElement';

const HistoryOffers = (props: IProfileHistoryOffersProps) => {
  const { trips } = props;

  const [filteredTrips, setFilteredTrips] = useState<IEndedSingleTripType[]>();
  console.log(trips);

  useEffect(() => {
    const tmp = trips.filter((trip: IEndedSingleTripType) => new Date().getTime() >= new Date(trip.date).getTime());
    setFilteredTrips(tmp);
  }, [trips]);

  return (
    <div>
      {filteredTrips &&
        filteredTrips.map((trip: IEndedSingleTripType) => (
          <div key={trip.offer.id}>
            <TripListElement trip={trip.offer} />
          </div>
        ))}
    </div>
  );
};

export default HistoryOffers;
