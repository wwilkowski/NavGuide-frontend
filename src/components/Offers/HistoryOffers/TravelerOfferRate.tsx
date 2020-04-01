import React from 'react';
import { Grid, Typography, makeStyles, Paper } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

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

const TravelerOfferRate = () => {
  const classes = useStyles();

  return (
    <>
      <Grid item sm={6} xs={6}>
        <Paper elevation={0} className={classes.title}>
          Ocena przewodnika
        </Paper>
      </Grid>
      <Grid item sm={6} xs={6}>
        <Paper elevation={0} className={classes.title}>
          Ocena turysty
        </Paper>
      </Grid>
      <Grid item sm={6} xs={6}>
        <Paper elevation={0} className={classes.rating}>
          <Rating value={3} readOnly />
        </Paper>
      </Grid>
      <Grid item sm={6} xs={6}>
        <Paper elevation={0} className={classes.rating}>
          <Rating value={3} readOnly />
        </Paper>
      </Grid>
      <Grid item sm={12} xs={12}>
        <Paper elevation={0} className={classes.description}>
          <Typography component='div'>OPIS OPIS OPIS OPIS </Typography>
        </Paper>
      </Grid>
    </>
  );
};

export default TravelerOfferRate;
