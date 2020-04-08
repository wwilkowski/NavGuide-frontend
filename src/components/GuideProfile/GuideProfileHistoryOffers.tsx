import React from 'react';
import { useTranslation } from 'react-i18next';
import { IEndedSingleTripType } from '../../containers/TripBrowser/types';
import { IGuideProfileHistoryOffersProps } from '../../containers/GuideProfile/types';
import { Grid, makeStyles, Typography, CardContent, CardActions, Card, Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';

import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '1rem 1rem 0',
  },
  info: {
    padding: '1rem 2.5rem',
  },
  title: {
    fontSize: 14,
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
  image: {
    width: theme.spacing(8),
    margin: 'auto',
  },
  actions: {
    padding: '0.5rem 1rem',
  },
  link: {
    fontSize: '0.8em',
  },
}));

const GuideProfileHistoryOffers = (props: IGuideProfileHistoryOffersProps) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { historyOffers } = props;

  const getDate = (date: string) => {
    return date.toString().replace('T', ' ').substr(0, date.toString().indexOf('.'));
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  return (
    <Grid container justify='center' className={classes.root}>
      {historyOffers.length > 0 &&
        historyOffers.map((trip: IEndedSingleTripType) => {
          return (
            <Grid item xs={10} sm={8}>
              <Card className={classes.root}>
                <CardContent className={classes.root}>
                  <Typography variant='subtitle1' className={classes.traveler}>
                    <Avatar className={classes.small} alt='' src={trip.traveler.avatar}></Avatar>
                    {trip.traveler.firstName} {trip.traveler.lastName}
                  </Typography>
                  <Typography className={classes.title} variant='h3'>
                    {trip.offer.name}
                  </Typography>
                  <Typography variant='subtitle2'>
                    {t('Planned date')}: {getDate(trip.dateMeeting.toString())}
                  </Typography>
                  <Typography variant='h3' className={classes.title}>
                    {t('Average mark')}:
                  </Typography>
                  <Rating precision={0.5} value={Math.round((trip.offer.averageMark * 10) / 10)} readOnly />
                </CardContent>
                <CardActions className={classes.actions}>
                  <Link to={`/offers/${trip.offer.id}`} className={classes.link}>
                    {t('See more')}
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      {historyOffers.length === 0 && (
        <Typography variant='subtitle2' className={classes.info}>
          {t('Offers that have taken place by this tourist will appear here.')}
        </Typography>
      )}
    </Grid>
  );
};

export default GuideProfileHistoryOffers;
