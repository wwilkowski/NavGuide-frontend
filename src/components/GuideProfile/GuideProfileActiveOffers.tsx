import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ISingleTripType } from '../../containers/TripBrowser/types';
import { IGuideProfileActiveOffersProps } from '../../containers/GuideProfile/types';
import TripListElement from '../TripBrowser/TripListElement';

interface ITripActivePhoto {
  tripId: number;
  activePhotoId: number;
  numberOfPhotos: number;
}

const GuideProfileActiveOffers = (props: IGuideProfileActiveOffersProps) => {
  const { t } = useTranslation();

  const { activeOffers } = props;

  const [value, setValue] = useState<string>('');
  const [filteredTrips, setFilteredTrips] = useState<ISingleTripType[]>([
    {
      inSearch: -1,
      averageMark: -1,
      begin: new Date(),
      city: '',
      description: '',
      end: new Date(),
      id: -1,
      lat: -1,
      lon: -1,
      maxPeople: -1,
      name: '',
      owner: {
        experience: -1,
        firstName: '',
        guideId: -1,
        languages: [''],
        lastName: '',
        userId: -1,
      },
      photos: [''],
      price: -1,
      priceType: '',
      radius: -1,
      sold: -1,
      tags: [{ id: -1, name: '' }],
    },
  ]);

  const [activePhotos, setActivePhotos] = useState<ITripActivePhoto[]>([{ tripId: -1, activePhotoId: -1, numberOfPhotos: -1 }]);

  useEffect(() => {
    setActivePhotos(activePhotos.splice(0));

    const tmp = activePhotos;
    activeOffers.forEach((offer: ISingleTripType) => {
      tmp.push({ tripId: offer.id, activePhotoId: 0, numberOfPhotos: offer.photos.length });
    });
    setActivePhotos(tmp);
  }, [activeOffers, activePhotos]);

  useEffect(() => {
    if (activeOffers) {
      setFilteredTrips(
        activeOffers.filter((trip: ISingleTripType) => {
          if (trip.name.substr(0, value.length) === value) return true;
          return false;
        })
      );
    }
  }, [value, activeOffers, activePhotos]);

  useEffect(() => {
    setFilteredTrips(activeOffers);
  }, [activeOffers]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div>
      {filteredTrips.map((trip: ISingleTripType) => {
        return <TripListElement trip={trip} />;
      })}
    </div>
  );
};

export default GuideProfileActiveOffers;
