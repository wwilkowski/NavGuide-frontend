import React, { useState, useEffect, useRef } from 'react';
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
import { ISingleTripType } from '../../containers/TripBrowser/types';

const TripInfo = (props: ITripInfoProps) => {
  const { t } = useTranslation();
  const dispatcher = useDispatch();
  const isLogged = useSelector((state: StoreType) => state.profile.isLoggedIn);
  const node: any = useRef();

  const [informationsMode, setInformationsMode] = useState<string>('trip');
  const [tripData, setTripData] = useState<ISingleTripType>({
    city: '',
    description: '',
    id: -1,
    lat: 0,
    lon: 0,
    maxPeople: 0,
    name: '',
    owner: {
      firstName: '',
      id: 0,
      languages: [],
      lastName: ''
    },
    photos: [],
    price: 0,
    priceType: '',
    radius: 0,
    tags: []
  });

  useEffect(() => {
    // add when mounted
    document.addEventListener('mousedown', handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  useEffect(() => {
    setTripData(props.tripInformations);
  }, [props.tripInformations]);

  const handleClick = (e: MouseEvent) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }

    // outside click
    props.changeTripInfoVisible(0);
  };

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
        <div style={{ width: '80%' }}>
          <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.8vh', padding: '0.3rem' }}>{t('Description')}</p>
        </div>
        <div className={styles.description}>
          <Description text={props.tripInformations.description} />
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
