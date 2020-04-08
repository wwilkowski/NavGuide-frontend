import React from 'react';
import { useTranslation } from 'react-i18next';
import { ISingleTripType } from '../../containers/TripBrowser/types';
import { IGuideProfileActiveOffersProps } from '../../containers/GuideProfile/types';
import TripListElement from '../TripBrowser/TripListElement';
import { Container, makeStyles, Grid, Typography } from '@material-ui/core';
import StarBorderTwoToneIcon from '@material-ui/icons/StarBorderTwoTone';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0rem 2rem',
  },
  info: {
    marginTop: '-1rem',
  },
  rate: {
    marginBottom: '-1rem',
    marginTop: '1rem',
  },
}));

const GuideProfileActiveOffers = (props: IGuideProfileActiveOffersProps) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { activeOffers } = props;

  return (
    <Container className={classes.root}>
      {activeOffers.map((trip: ISingleTripType) => {
        return (
          <>
            <Grid item container justify='flex-end' xs={12} sm={12} className={classes.rate}>
              <Typography style={{ textAlign: 'right', marginTop: 'auto' }} variant='body1'>
                {trip.averageMark >= 0 ? <div>{Math.round((trip.averageMark * 10) / 10)}/5</div> : <div>{t('N.D.')}</div>}
              </Typography>
              <StarBorderTwoToneIcon />
            </Grid>
            <TripListElement trip={trip} />
            <Grid container style={window.innerWidth < 900 ? { marginBottom: '3rem' } : {}}>
              <Grid item xs={6} sm={6} className={classes.info}>
                <Typography variant='body1'>
                  {t('Sold')}: {trip.sold}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={6} className={classes.info}>
                <Typography style={{ textAlign: 'right' }} variant='body1'>
                  {t('Visits')}: {trip.inSearch}
                </Typography>
              </Grid>
            </Grid>
          </>
        );
      })}
    </Container>
  );
};

export default GuideProfileActiveOffers;
