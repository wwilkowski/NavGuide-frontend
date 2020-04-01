import React from 'react';
import { Grid, Typography, makeStyles, Paper } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { ITravelerOfferRateProps } from './types';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    justifyContent: 'space-around'
  },
  title: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    fontSize: '1em',
    textAlign: 'center'
  },
  rating: {
    textAlign: 'center',
    padding: theme.spacing(1),
    color: theme.palette.text.secondary
  },
  description: {
    textAlign: 'center',
    padding: theme.spacing(1),
    color: theme.palette.text.primary
  }
}));

const TravelerOfferRate = (props: ITravelerOfferRateProps) => {
  const classes = useStyles();

  const { description, scoreGuide, scoreOffer } = props;

  return (
    <>
      <Grid item sm={6} xs={6}>
        <Paper elevation={0} className={classes.title}>
          Ocena przewodnika
        </Paper>
      </Grid>
      <Grid item sm={6} xs={6}>
        <Paper elevation={0} className={classes.title}>
          Ocena wycieczki
        </Paper>
      </Grid>
      <Grid item sm={6} xs={6}>
        <Paper elevation={0} className={classes.rating}>
          <Rating value={scoreGuide} readOnly />
        </Paper>
      </Grid>
      <Grid item sm={6} xs={6}>
        <Paper elevation={0} className={classes.rating}>
          <Rating value={scoreOffer} readOnly />
        </Paper>
      </Grid>
      <Grid item sm={12} xs={12}>
        <Paper elevation={0} className={classes.description}>
          <Typography component='div'>{description} </Typography>
        </Paper>
      </Grid>
    </>
  );
};

export default TravelerOfferRate;
