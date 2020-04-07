import React from 'react';
import { IOffer, IProfileOffersProps } from '../../../containers/Offers/types';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Typography, makeStyles, Card, CardContent, CardActions, Avatar } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  link: {
    fontSize: '0.8em',
  },
  actions: {
    padding: '0.5rem 1rem',
  },
  small: {
    width: 30,
    height: 30,
    marginRight: '0.5rem',
  },
  traveler: {
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
  },
  info: {
    padding: '1rem 2.5rem',
  },
});

const ActiveOffers = ({ trips }: IProfileOffersProps) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const getDate = (date: Date) => {
    return date.toString().replace('T', ' ').substr(0, date.toString().indexOf('.'));
  };

  return trips && trips.length ? (
    <ul style={window.innerWidth < 900 ? { marginBottom: '4rem' } : {}}>
      {trips.map((trip: IOffer, i: number) => (
        <li key={i} style={{ padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '1rem 0' }}>
          <Card className={classes.root}>
            <CardContent>
              <Typography variant='subtitle1' className={classes.traveler}>
                <Avatar src={trip.traveler.avatar} className={classes.small} />
                {trip.traveler.firstName} {trip.traveler.lastName}
              </Typography>
              <Typography variant='h3' className={classes.title}>
                {trip.offer.name}
              </Typography>
              <Typography variant='subtitle2'>
                {t('Planned date')}: {getDate(trip.plannedDate)}
              </Typography>

              {/* <TripListElement trip={trip.offer} hidePhoto={true} /> */}
            </CardContent>
            <CardActions className={classes.actions}>
              <Link to={`/agreement/create/${trip.traveler.id}/${trip.offer.id}/${trip.id}`} className={classes.link}>
                Szczegóły oferty
              </Link>
            </CardActions>
          </Card>
        </li>
      ))}
    </ul>
  ) : (
    <Typography variant='subtitle2' className={classes.info}>
      {t('Offers in progress will appear here. You will get access to the contract and talk to another person.')}
    </Typography>
  );
};

export default ActiveOffers;
