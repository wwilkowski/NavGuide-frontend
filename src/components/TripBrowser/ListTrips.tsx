import React from 'react';
import * as types from './types';
import { ISingleTripType, ITag } from '../../containers/TripBrowser/types';
import { useTranslation } from 'react-i18next';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { StoreType } from '../../store';

const useStyles = makeStyles({
  card: {
    padding: '1rem',
    margin: '0.5rem'
  }
});

const ListTrips = ({ trips, mode }: types.IListTripsProps) => {
  const isLogged: boolean = useSelector((state: StoreType) => state.profile.isLoggedIn);
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <>
      {mode === 'random' ? (
        <p>
          {t('No matching trips')} {t('Suggested trips')}:
        </p>
      ) : null}
      {trips.length === 0 && mode === 'geo' ? <p>{t('No matching trips')}.</p> : null}
      <ul>
        {trips.map((trip: ISingleTripType) => (
          <Card className={classes.card} key={trip.id}>
            <p>
              {t('ID')}: {trip.id}
            </p>
            <p>
              {t('City')}: {trip.city}
            </p>
            {isLogged && (
              <p>
                {t('Guide')}: {trip.owner.firstName} {trip.owner.lastName}
              </p>
            )}
            <p>
              {t('Name')}: {trip.name}
            </p>
            {isLogged && (
              <p>
                {t('Photos')}:{' '}
                {trip.photos.map((photo: string) => (
                  <img src={photo} />
                ))}
              </p>
            )}
            <p>
              {t('Price')}: {trip.price}
            </p>
            <p>
              {t('Price Type')}: {trip.priceType}
            </p>
            {isLogged && (
              <p>
                {t('Max People')}: {trip.maxPeople}
              </p>
            )}
            {isLogged && (
              <p>
                {t('Languages')}: {trip.owner.languages.map((lng: string) => `${lng} `)}
              </p>
            )}
            <p>
              {t('Tags')}: {trip.tags.map((tag: ITag) => `${tag.name} `)}
            </p>
            <p>
              {t('Coords')}: {trip.lat} {trip.lon}
            </p>
            <p>
              {t('Radius')}: {trip.radius}
            </p>
          </Card>
        ))}
      </ul>
    </>
  );
};

export default ListTrips;
