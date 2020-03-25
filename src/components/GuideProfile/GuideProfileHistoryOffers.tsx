import React, { useState, useEffect } from 'react';
import styles from './GuideProfileHistoryOffers.module.scss';
import { useTranslation } from 'react-i18next';
import { ITag, IEndedSingleTripType, ISingleTripType } from '../../containers/TripBrowser/types';
import { IGuideProfileHistoryOffersProps } from '../../containers/GuideProfile/types';
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

const GuideProfileHistoryOffers = (props: IGuideProfileHistoryOffersProps) => {
  const { t } = useTranslation();

  const { historyOffers, goBack } = props;

  const [activeMode, setActiveMode] = useState<ActiveMode>(ActiveMode.informations);

  const [value, setValue] = useState<string>('');
  const [visibleIds, setVisibleIds] = useState<number[]>([]);
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
      <div className={styles.container__title}>{t('History Offers')}</div>
      {filteredTrips.length > 0 &&
        filteredTrips.map((trip: IEndedSingleTripType) => {
          return <TripListElement trip={trip.offer} />;
        })}
    </div>
  );
};

export default GuideProfileHistoryOffers;
