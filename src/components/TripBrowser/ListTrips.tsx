import React from 'react';
import * as types from './types';
import { ISingleTripType } from '../../containers/TripBrowser/types';
import { useTranslation } from 'react-i18next';
import TripListElement from './TripListElement';
import styles from './ListTrips.module.scss';
import { Container, Grid, Typography } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const ListTrips = ({ trips, closestTrips, mode, chosenOfferId, setChosenOfferId }: types.IListTripsProps) => {
  const { t } = useTranslation();

  const closestTripsData = closestTrips;

  return (
    <Container>
      {mode === types.ListMode.closest ? (
        <Grid container>
          <Grid container className={styles.noTripsPlug}>
            <Grid item xs={10} sm={8}>
              <Grid container justify='center'>
                <Typography style={{ color: '#2841cc' }} variant='h6'>
                  {t('No matching trips')}.
                </Typography>
              </Grid>
              <Grid container justify='center'>
                <Typography variant='subtitle2'>{t('Try to change the parameters and find again')}.</Typography>
              </Grid>
              <Grid container item justify='center' xs={12}>
                <Typography style={{ textAlign: 'center' }} variant='h6'>
                  {t('Below are suggested trips in your area')}.
                </Typography>
              </Grid>
            </Grid>
            <Grid container item alignItems='center' justify='center' xs={2} sm={4}>
              <ErrorOutlineIcon style={{ opacity: '0.8', fontSize: '3rem', color: '#2841cc' }} fontSize='large' />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12}>
            <ul className={styles.listTrips}>
              {closestTripsData.map((trip: ISingleTripType) => (
                <div key={trip.id}>
                  <TripListElement trip={trip} />
                </div>
              ))}
            </ul>
          </Grid>
        </Grid>
      ) : mode === types.ListMode.popular ? (
        <p>
          {t('No matching trips')}. {t('The most popular trips')}:
        </p>
      ) : (
        <ul className={styles.listTrips}>
          {trips.map((trip: ISingleTripType) => (
            <div key={trip.id}>
              <TripListElement trip={trip} />
            </div>
          ))}
        </ul>
      )}
    </Container>
  );
};

export default ListTrips;
