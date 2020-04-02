import React from 'react';
import { IGuideOfferRateProps } from './types';
import { Grid, Paper, makeStyles, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '1.2em',
    textAlign: 'center',
    padding: theme.spacing(1)
  },
  heading: {
    fontSize: '1em',
    color: theme.palette.text.secondary
  },
  rating: {
    textAlign: 'right',
    margin: 'auto'
  },
  content: {
    margin: theme.spacing(1),
    padding: theme.spacing(1.5),
    overflowY: 'auto'
  },
  iconUp: {
    textAlign: 'center',
    margin: 'auto',
    color: 'green'
  },
  iconDown: {
    margin: 'auto',
    textAlign: 'center',
    color: 'red'
  },
  comment: {
    padding: theme.spacing(1),
    fontSize: '0.9em'
  }
}));

const calcAvg = (scoreOffer: number, scoreGuide: number) => {
  return (scoreOffer + scoreGuide) / 2;
};

const GuideOfferRate = (props: IGuideOfferRateProps) => {
  const { feedback } = props;

  const classes = useStyles();

  return (
    <>
      {feedback && window.innerWidth > 900 && (
        <Paper>
          <Grid container justify='center' sm={12} className={classes.content}>
            <Grid item sm={12}></Grid>
            <Grid item sm={6}>
              <Typography component='p' className={classes.heading}>
                Opis
              </Typography>
              <Typography component='p'>{feedback.comment}</Typography>
            </Grid>
            <Grid item sm={4}>
              <Grid container justify='center' sm={12} className={classes.heading}>
                Przewodnik:
              </Grid>
              <Grid container justify='center' sm={12}>
                <Rating name='read-only' value={feedback.scoreGuide} readOnly />
              </Grid>
              <Grid container justify='center' sm={12} className={classes.heading}>
                Wycieczka:
              </Grid>
              <Grid container justify='center' sm={12}>
                <Rating className={classes.rating} name='read-only' value={feedback.scoreOffer} readOnly />
              </Grid>
            </Grid>
            <Grid container justify='flex-start' sm={2}>
              {calcAvg(feedback.scoreOffer, feedback.scoreGuide) > 3 ? (
                <ThumbUpAltIcon fontSize='large' className={classes.iconUp} />
              ) : (
                <ThumbDownIcon fontSize='large' className={classes.iconDown} />
              )}
            </Grid>
          </Grid>
        </Paper>
      )}
      {feedback && window.innerWidth <= 900 && (
        <Paper className={classes.content}>
          <Grid container xs={12}>
            <Grid container xs={9}>
              <Grid item xs={6}>
                <p className={classes.heading}>Przewodnik</p>
              </Grid>
              <Grid item xs={6}>
                <Rating name='read-only' value={feedback.scoreGuide} readOnly />
              </Grid>
              <Grid item xs={6}>
                <p className={classes.heading}>Wycieczka</p>
              </Grid>

              <Grid item xs={6}>
                <Rating className={classes.rating} name='read-only' value={feedback.scoreOffer} readOnly />
              </Grid>
            </Grid>
            <Grid container justify='center' xs={3}>
              {calcAvg(feedback.scoreOffer, feedback.scoreGuide) > 3 ? (
                <ThumbUpAltIcon fontSize='large' className={classes.iconUp} />
              ) : (
                <ThumbDownIcon fontSize='large' className={classes.iconDown} />
              )}
            </Grid>
            <Grid container justify='center'>
              <p className={classes.comment}>{feedback.comment}</p>
            </Grid>
          </Grid>
        </Paper>
      )}
    </>
  );
};

export default GuideOfferRate;
