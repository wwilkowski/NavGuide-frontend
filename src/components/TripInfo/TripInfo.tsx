import React, { useState, useEffect, useRef } from 'react';
import styles from './TripInfo.module.scss';
import { ITripInfoProps } from './types';
import Gallery from './Gallery/Gallery';
import Informations from './Informations/Informations';
import Description from './Description/Description';
import { useTranslation } from 'react-i18next';
import { StoreType } from '../../store';
import { useSelector } from 'react-redux';
import { ISingleTripType } from '../../containers/TripBrowser/types';

const TripInfo = (props: ITripInfoProps) => {
  const { t } = useTranslation();
  const isLogged = useSelector((state: StoreType) => state.profile.isLoggedIn);
  const node: any = useRef();

  const [informationsMode, setInformationsMode] = useState<string>('trip');
  const [tripData, setTripData] = useState<ISingleTripType>({
    averageMark: -1,
    city: '',
    description: '',
    id: -1,
    lat: 0,
    lon: 0,
    maxPeople: 0,
    name: '',
    owner: {
      experience: -1,
      firstName: '',
      userId: 0,
      languages: [],
      lastName: '',
      guideId: -1
    },
    photos: [],
    price: 0,
    priceType: '',
    radius: 0,
    sold: 0,
    tags: []
  });

  useEffect(() => {
    setTripData(props.tripInformations);
  }, [props.tripInformations]);

  const changeInformationsMode = (mode: string) => {
    setInformationsMode(mode);
    if (informationsMode === 'trip') setTripData(props.tripInformations);
  };
  return isLogged ? (
    <div className={styles.infoContainer}>
      <div className={styles.infoContainer__content} ref={node}>
        <div className={styles.infoContainer__header}>{props.tripInformations.name}</div>
        <div className={styles.gallery}>
          <Gallery photos={props.tripInformations.photos} />
        </div>
        <div className={styles.informations}>
          <Informations
            mode={informationsMode}
            changeInformationsMode={changeInformationsMode}
            tripData={tripData}
            guideProfile={props.guideProfile}
            guideProfileData={props.guideProfileData}
          />
        </div>
        {/* <div className={styles.orderButton}>
          <Link to={`/offers/${tripData.id}/buy`}>{t('Order now!')}</Link>
        </div> */}
        <div className={styles.description}>
          <p className={styles.description__title}>{t('Description')}</p>
          <div className={styles.description__content}>
            <Description text={props.tripInformations.description} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.infoContainer}>
      <div className={styles.infoContainer__content} ref={node}>
        <p style={{ margin: '2rem' }}>Zaloguj się lub zarejestruj, aby zobaczyć więcej</p>
      </div>
    </div>
  );
};

export default TripInfo;
