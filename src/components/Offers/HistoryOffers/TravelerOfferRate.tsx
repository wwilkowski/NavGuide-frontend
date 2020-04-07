import React from 'react';
import { Grid, Typography, makeStyles, Paper } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { ITravelerOfferRateProps } from './types';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: 'space-around',
  },
  title: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    fontSize: '1em',
    textAlign: 'center',
  },
  rating: {
    textAlign: 'center',
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  description: {
    textAlign: 'center',
    padding: theme.spacing(1),
    color: theme.palette.text.primary,
  },
  centered: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const TravelerOfferRate = (props: ITravelerOfferRateProps) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const { feedback } = props;

  return (
    <Grid container xs={12} sm={12} style={window.innerWidth < 900 ? { marginBottom: '4rem' } : {}}>
      <Grid item sm={6} xs={6} className={classes.centered}>
        <Typography variant='h4'>{t('Score guide')}</Typography>
      </Grid>
      <Grid item sm={6} xs={6} className={classes.centered}>
        <Rating value={feedback ? feedback.scoreGuide : 0} readOnly />
      </Grid>
      <Grid item sm={6} xs={6} className={classes.centered}>
        <Typography variant='h4'>{t('Score offer')}</Typography>
      </Grid>
      <Grid item sm={6} xs={6} className={classes.centered}>
        <Rating value={feedback ? feedback.scoreOffer : 0} readOnly />
      </Grid>
      <Grid item sm={12} xs={12}>
        <Paper elevation={0} className={classes.description}>
          <Typography component='div'>{feedback ? feedback.comment : ''} </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default TravelerOfferRate;
