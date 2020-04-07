import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { IEndedSingleTripType } from '../../containers/TripBrowser/types';
import { IGuideProfileHistoryOffersProps } from '../../containers/GuideProfile/types';
import TripListElement from '../TripBrowser/TripListElement';

interface ITripActivePhoto {
  tripId: number;
  activePhotoId: number;
  numberOfPhotos: number;
}

const GuideProfileHistoryOffers = (props: IGuideProfileHistoryOffersProps) => {
  const { t } = useTranslation();
  const { historyOffers } = props;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [value, setValue] = useState<string>('');
  const [filteredTrips, setFilteredTrips] = useState<IEndedSingleTripType[]>([]);

  const [activePhotos, setActivePhotos] = useState<ITripActivePhoto[]>([{ tripId: -1, activePhotoId: -1, numberOfPhotos: -1 }]);

  useEffect(() => {
    setActivePhotos(activePhotos.splice(0));

    const tmp = activePhotos;
    historyOffers.forEach((offer: IEndedSingleTripType) => {
      tmp.push({ tripId: offer.offer.id, activePhotoId: 0, numberOfPhotos: offer.offer.photos.length });
    });
    setActivePhotos(tmp);
  }, [historyOffers, activePhotos]);

  useEffect(() => {
    if (historyOffers) {
      setFilteredTrips(
        historyOffers.filter((trip: IEndedSingleTripType) => {
          if (trip.offer.name.substr(0, value.length) === value) return true;
          return false;
        })
      );
    }
  }, [value, historyOffers, activePhotos]);

  useEffect(() => {
    setFilteredTrips(historyOffers);
  }, [historyOffers]);

  return (
    <div>
      {filteredTrips.length > 0 &&
        filteredTrips.map((trip: IEndedSingleTripType) => {
          return <TripListElement trip={trip.offer} />;
        })}
    </div>
  );
};

export default GuideProfileHistoryOffers;
