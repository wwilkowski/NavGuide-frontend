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
      averageMark: -1,
      begin: '',
      city: '',
      description: '',
      end: '',
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
      <div className={styles.container__title}>
        {t('Active Offers')}
        <div className={styles.backButton} onClick={goBack}>
          <img src={back} alt='' />
        </div>
      </div>
      <div className={styles.container__input}>
        <input value={value} onChange={handleChange} />
      </div>
      <div className={styles.container__content}>
        {filteredTrips.map((trip: ISingleTripType, index: number) => {
          const indexInActivePhotos = findIndex(trip.id);
          return (
            <div key={trip.id} className={styles.trip} style={index === filteredTrips.length - 1 ? { marginBottom: '0' } : {}}>
              <div className={styles.trip__title} onClick={() => toogleTripVisible(trip.id)}>
                {trip.name}
              </div>
              <div className={styles.gallery}>
                <div className={styles.gallery__switchLeft} onClick={() => changeActivePhoto(trip.id, Direction.left)}>
                  <img src={leftArrow} alt='' />
                </div>
                <div className={styles.gallery__content}>
                  <img src={trip.photos[activePhotos[indexInActivePhotos].activePhotoId]} alt='' />
                </div>
                <div className={styles.gallery__switchRight} onClick={() => changeActivePhoto(trip.id, Direction.right)}>
                  <img src={rightArrow} alt='' />
                </div>
                <div className={styles.gallery__footer}>
                  {trip.photos.map((el: string, index: number) =>
                    index === activePhotos[indexInActivePhotos].activePhotoId ? (
                      <div key={index} className={styles.dotActive} onClick={() => setActivePhoto(trip.id, index)} />
                    ) : (
                      <div key={index} className={styles.dot} onClick={() => setActivePhoto(trip.id, index)} />
                    )
                  )}
                </div>
              </div>
              <div className={visibleIds.includes(trip.id) ? styles.trip__data : styles.trip__dataHidden}>
                {activeMode === ActiveMode.informations ? (
                  <>
                    <div className={styles.switchData__active} onClick={() => setActiveMode(ActiveMode.informations)}>
                      <img src={goLeft} alt='' />
                    </div>
                    <p className={styles.title}>{t('Informations')}</p>
                    <div className={styles.switchData} onClick={() => setActiveMode(ActiveMode.description)}>
                      <img src={goRight} alt='' />
                    </div>
                    <p className={styles.left}>{t('City')}:</p>
                    <p className={styles.right}>{trip.city}</p>
                    <p className={styles.left}>{t('Price')}:</p>
                    <p className={styles.right}>
                      {trip.price} ({t(trip.priceType)})
                    </p>
                    <p className={styles.left} style={{ width: '70%' }}>
                      {t('Max people')}:
                    </p>
                    <p className={styles.right} style={{ width: '30%' }}>
                      {trip.maxPeople}
                    </p>
                    <p className={styles.title}>{t('Availability')}</p>
                    <p className={styles.left}>{t('From')}:</p>
                    <p className={styles.right}>1.01.2020</p>
                    <p className={styles.left}>{t('To')}:</p>
                    <p className={styles.right}>1.03.2020</p>
                    <p className={styles.right} />
                    <div className={styles.tags}>
                      <div className={styles.tags__title}>{t('Tags')}</div>
                      <div className={styles.tags__content}>
                        {trip.tags.map((tag: ITag) => (
                          <div key={tag.id} className={styles.tag}>
                            {t(tag.name)}{' '}
                          </div>
                        ))}
                      </div>
                    </div>

                    <p className={styles.title}>{t('Statistics')}</p>
                    <p className={styles.left}>{t('Sold')}:</p>
                    <p className={styles.right}>{trip.sold}</p>
                    <p className={styles.left} style={{ width: '60%' }}>
                      {t('Average mark')}:
                    </p>
                    <p className={styles.right} style={{ width: '40%' }}>
                      {trip.averageMark > 0 ? trip.averageMark : 0}
                    </p>
                    <div className={styles.visits}>
                      <p className={styles.title} style={{ marginBottom: '0.5rem', width: '60%' }}>
                        {t('Number of visits')}
                      </p>
                      <p style={{ width: '100%', textAlign: 'center', marginBottom: '1rem' }}>23</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.switchData} onClick={() => setActiveMode(ActiveMode.informations)}>
                      <img src={goLeft} alt='' />
                    </div>
                    <p className={styles.title}>{t('Description')}</p>
                    <div className={styles.switchData__active} onClick={() => setActiveMode(ActiveMode.description)}>
                      <img src={goRight} alt='' />
                    </div>
                    <div className={styles.description}>{trip.description}</div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GuideProfileActiveOffers;
