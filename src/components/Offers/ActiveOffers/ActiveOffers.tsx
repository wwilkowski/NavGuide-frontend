import React, { useEffect, useState } from 'react';
import TripListElement from '../../TripBrowser/TripListElement';
import { IOffer, IProfileOffersProps } from '../../../containers/Offers/types';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  text: {
    marginTop: '1rem'
  }
});

const ActiveOffers = ({ trips }: IProfileOffersProps) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const getDate = (date: Date) => {
    return date
      .toString()
      .replace('T', ' ')
      .substr(0, date.toString().indexOf('.'));
  };

  return trips && trips.length ? (
    <ul>
      {trips.map((trip: IOffer, i: number) => (
        <li key={i} style={{ padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '1rem 0' }}>
          <Typography variant='subtitle2'>
            <b>{t('Planned date')}:</b> {getDate(trip.plannedDate)}
          </Typography>
          <TripListElement trip={trip.offer} hidePhoto={true} />
          <Link to={`/agreement/create/${trip.traveler.id}/${trip.offer.id}/${trip.id}`} className={classes.text}>
            Szczegóły oferty
          </Link>
        </li>
      ))}
    </ul>
  ) : null;
};

export default ActiveOffers;
