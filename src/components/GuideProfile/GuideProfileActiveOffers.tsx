import React, { useState, useEffect } from 'react';
import styles from './GuideProfileActiveOffers.module.scss';
import { useTranslation } from 'react-i18next';
import { ISingleTripType, ITag } from '../../containers/TripBrowser/types';
import { IGuideProfileActiveOffersProps } from '../../containers/GuideProfile/types';
import back from '../../assets/icons/back.png';
import leftArrow from '../../assets/icons/leftArrow.png';
import rightArrow from '../../assets/icons/rightArrow.png';
import goLeft from '../../assets/icons/goLeft.png';
import goRight from '../../assets/icons/goRight.png';
import TripListElement from '../TripBrowser/TripListElement';

interface ITripActivePhoto {
  tripId: number;
  activePhotoId: number;
  numberOfPhotos: number;
}

enum Direction {
  left,
  right
}

enum ActiveMode {
  informations,
  description
}

const GuideProfileActiveOffers = (props: IGuideProfileActiveOffersProps) => {
  const { t } = useTranslation();

  const { activeOffers, goBack } = props;

  const [activeMode, setActiveMode] = useState<ActiveMode>(ActiveMode.informations);

  const [value, setValue] = useState<string>('');
  const [visibleIds, setVisibleIds] = useState<number[]>([]);
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
        userId: -1
      },
      photos: [''],
      price: -1,
      priceType: '',
      radius: -1,
      sold: -1,
      tags: [{ id: -1, name: '' }]
    }
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

  const toogleTripVisible = (id: number) => {
    if (visibleIds.includes(id)) {
      const index = visibleIds.indexOf(id);
      setVisibleIds(visibleIds.splice(index, -1));
    } else {
      setVisibleIds(visibleIds.concat([id]));
    }
  };

  const changeActivePhoto = (tripId: number, direction: Direction) => {
    const tmp: ITripActivePhoto[] = [];
    activePhotos.forEach((trip: ITripActivePhoto) => {
      if (trip.tripId === tripId) {
        if (direction === Direction.left) {
          if (trip.activePhotoId === 0) trip.activePhotoId = trip.numberOfPhotos - 1;
          else trip.activePhotoId++;
        } else {
          if (trip.activePhotoId === trip.numberOfPhotos - 1) trip.activePhotoId = 0;
          else trip.activePhotoId++;
        }
      }
      tmp.push(trip);
    });
    setActivePhotos(tmp);
  };

  const setActivePhoto = (tripId: number, photoId: number) => {
    const tmp: ITripActivePhoto[] = [];
    activePhotos.forEach((trip: ITripActivePhoto) => {
      if (trip.tripId === tripId) {
        trip.activePhotoId = photoId;
      }
      tmp.push(trip);
    });
    setActivePhotos(tmp);
  };

  const findIndex = (id: number) => {
    let i = 0;

    for (const el of activePhotos) {
      if (el.tripId === id) break;
      i++;
    }
    return i;
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__title}>{t('Active Offers')}</div>
      <div className={styles.container__input}>
        <input value={value} onChange={handleChange} />
      </div>
      {filteredTrips.map((trip: ISingleTripType) => {
        return <TripListElement trip={trip} />;
      })}
    </div>
  );
};

export default GuideProfileActiveOffers;
