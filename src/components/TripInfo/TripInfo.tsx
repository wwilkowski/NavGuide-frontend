import React, { useState, useEffect, useRef } from 'react';
import styles from './TripInfo.module.scss';
import { ITripInfoProps } from './types';
import Gallery from './Gallery/Gallery';
import Informations from './Informations/Informations';
import Description from './Description/Description';
import { useTranslation } from 'react-i18next';
import { StoreType } from '../../store';
import { useSelector } from 'react-redux';
import { ISingleTripType, IPosition } from '../../containers/TripBrowser/types';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { Link } from 'react-router-dom';
import ReportPopup from '../Offers/ReportPopup/ReportPopup';
import { Grid, Button } from '@material-ui/core';

const TripInfo = (props: ITripInfoProps) => {
  const { t } = useTranslation();
  const isLogged = useSelector((state: StoreType) => state.profile.isLoggedIn);

  const node: any = useRef();

  const [popupVisibility, setPopupVisibility] = useState<boolean>(false);
  const [informationsMode, setInformationsMode] = useState<string>('trip');
  const [tripData, setTripData] = useState<ISingleTripType>({
    inSearch: -1,
    averageMark: -1,
    begin: new Date(),
    city: '',
    description: '',
    end: new Date(),
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
      guideId: -1,
    },
    photos: [],
    price: 0,
    priceType: '',
    radius: 0,
    sold: 0,
    tags: [],
  });

  useEffect(() => {
    setTripData(props.tripInformations);
  }, [props.tripInformations]);

  const changeInformationsMode = (mode: string) => {
    setInformationsMode(mode);
    if (informationsMode === 'trip') setTripData(props.tripInformations);
  };

  const position: IPosition = {
    latitude: 53.01023065,
    longitude: 18.594376006630313,
    radius: 0.0,
  };

  return (
    <div className={styles.case}>
      <div>
        <Map center={{ lat: position.latitude, lng: position.longitude }} zoom={12} className={styles.map}>
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={{ lat: position.latitude, lng: position.longitude }} opacity={0.5}>
            <Popup>{t('You')}</Popup>
          </Marker>
        </Map>
      </div>
      <div className={styles.container} ref={node}>
        <div className={styles.mainInfo}>
          <h2 className={styles.title}>{props.tripInformations.name}</h2>
          <Gallery photos={props.tripInformations.photos} />
          <h2 className={styles.title}>{t('Description')}</h2>
          <Description text={props.tripInformations.description} />
          {isLogged && (
            <Link to={`/offers/${tripData.id}/buy`} className={styles.link}>
              {t('Order now')}!
            </Link>
          )}
        </div>
        <Informations
          mode={informationsMode}
          changeInformationsMode={changeInformationsMode}
          tripData={tripData}
          guideProfile={props.guideProfile}
          guideProfileData={props.guideProfileData}
        />
      </div>
      <Grid container justify='center'>
        <Button color='secondary' onClick={() => setPopupVisibility(true)}>
          {t('Report offer')}
        </Button>
      </Grid>
      <ReportPopup offerId={tripData.id} popupVisibility={popupVisibility} changeVisibility={() => setPopupVisibility(!popupVisibility)} />
    </div>
  );
};

export default TripInfo;
