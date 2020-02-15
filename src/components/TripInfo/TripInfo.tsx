import React, { useState, useEffect } from 'react';
import styles from './TripInfo.module.scss';
import { ITripInfoProps } from './types';
import Gallery from './Gallery/Gallery';
import Informations from './Informations/Informations';
import Description from './Description/Description';
import { useTranslation } from 'react-i18next';
import { StoreType } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import { logInGoogleRequest } from '../../containers/Profile/actions';
import { getInterestsRequest, signUpGoogleRequest } from '../../containers/Registration/actions';
import GoogleButton from '../../components/GoogleButton/GoogleButton';
import { IUserData } from '../../shared/types';
import { ISingleTripType } from '../../containers/TripBrowser/types';

const TripInfo = (props: ITripInfoProps) => {
  const { t } = useTranslation();
  const dispatcher = useDispatch();
  const isLogged = useSelector((state: StoreType) => state.profile.isLoggedIn);

  const [informationsMode, setInformationsMode] = useState<string>('trip');
  const [tripData, setTripData] = useState<ISingleTripType>({
    city: '',
    id: -1,
    lat: 0,
    lon: 0,
    maxPeople: 0,
    name: '',
    owner: {
      firstName: '',
      languages: [],
      lastName: ''
    },
    photos: [],
    price: 0,
    priceType: '',
    radius: 0,
    tags: []
  }); //naprawic + dodac pobieranie info o przewodniku
  const [guideData, setGuideData] = useState<IUserData>();

  useEffect(() => {
    setTripData(props.tripInformations);
  }, [props.tripInformations]);

  const signUpWithUserCode = (code: string) => {
    dispatcher(signUpGoogleRequest(code));
    dispatcher(getInterestsRequest());
  };
  const signInWithUserCode = (code: string) => {
    dispatcher(logInGoogleRequest(code));
  };

  const changeInformationsMode = (mode: string) => {
    setInformationsMode(mode);
    if (informationsMode === 'trip') setTripData(props.tripInformations);
  };

  return isLogged ? (
    <div className={styles.infoContainer}>
      <div className={styles.infoContainer__content}>
        <div className={styles.infoContainer__header}>Nazwa wycieczki</div>
        <div className={styles.gallery}>
          <Gallery photos={props.tripInformations.photos} />
        </div>
        <div className={styles.informations}>
          <Informations mode={informationsMode} changeInformationsMode={changeInformationsMode} tripData={tripData} />
        </div>
        <div>
          <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>{t('Description')}</p>
        </div>
        <div className={styles.description} onClick={() => props.changeTripInfoVisible(1)}>
          <Description />
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.infoContainer}>
      <div className={styles.infoContainer__content}>Aby zobaczyć więcej:</div>
      <div className={styles.googleButtons}>
        <p style={{ width: '50%' }}>
          <GoogleButton text='Sign up with Google' onSuccess={signUpWithUserCode} onFailure={signUpWithUserCode} />
        </p>
        <p>
          <GoogleButton text='Sign in with Google' onSuccess={signInWithUserCode} onFailure={signInWithUserCode} />
        </p>
      </div>
    </div>
  );
};

export default TripInfo;
