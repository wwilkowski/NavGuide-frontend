import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { IEndedSingleTripType } from '../../containers/TripBrowser/types';
import { IGuideProfileHistoryOffersProps } from '../../containers/GuideProfile/types';
import { Grid, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  info: {
    padding: '1rem 2.5rem',
  },
}));

const GuideProfileHistoryOffers = (props: IGuideProfileHistoryOffersProps) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { historyOffers } = props;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  return (
    <Grid container>
      {historyOffers.length > 0 &&
        historyOffers.map((trip: IEndedSingleTripType) => {
          return <Grid></Grid>;
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
