import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { IEndedSingleTripType } from '../../containers/TripBrowser/types';
import { IGuideProfileHistoryOffersProps } from '../../containers/GuideProfile/types';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({}));

const GuideProfileHistoryOffers = (props: IGuideProfileHistoryOffersProps) => {
  const { t } = useTranslation();
  const { historyOffers } = props;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  return (
    <Grid container>
      {historyOffers.length > 0 &&
        historyOffers.map((trip: IEndedSingleTripType) => {
          return <Grid></Grid>;
        })}
    </Grid>
  );
};

export default GuideProfileHistoryOffers;
