import React from 'react';
import { IProfileHistoryOffersProps } from '../../../containers/Offers/types';
import { ISingleTripType } from '../../../containers/TripBrowser/types';
import TripListElement from '../../TripBrowser/TripListElement';

const HistoryOffers = (props: IProfileHistoryOffersProps) => {
  const { trips } = props;

  return (
    <div>
      {trips &&
        trips.map((trip: ISingleTripType) => (
          <div key={trip.id}>
            <TripListElement trip={trip} />
          </div>
        ))}
    </div>
  );
};

export default HistoryOffers;
