import React from 'react';
import { IProfileHistoryOffersProps } from '../../../containers/Offers/types';
import { IEndedSingleTripType } from '../../../containers/TripBrowser/types';
import TripListElement from '../../TripBrowser/TripListElement';

const HistoryOffers = (props: IProfileHistoryOffersProps) => {
  const { trips } = props;

  return (
    <div>
      {trips &&
        trips.map((trip: IEndedSingleTripType) => (
          <div key={trip.offer.id}>
            <TripListElement trip={trip.offer} />
          </div>
        ))}
    </div>
  );
};

export default HistoryOffers;
