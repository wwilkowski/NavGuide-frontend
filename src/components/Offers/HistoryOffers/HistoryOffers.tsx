import React, { useState, useEffect } from 'react';
import { IProfileHistoryOffersProps, IFeedback, IGotFeedback } from '../../../containers/Offers/types';
import { IEndedSingleTripType } from '../../../containers/TripBrowser/types';
import TripListElement from '../../TripBrowser/TripListElement';
import * as actions from '../../../containers/Offers/actions';
import { useDispatch } from 'react-redux';
import { makeStyles, Typography, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import styles from './HistoryOffers.module.scss';
import i18n from '../../../locales/i18n';
import RatesOfferPopup from './RatesOfferPopup/RatesOfferPopup';
import TravelerOfferRate from './TravelerOfferRate';
import RateOfferPopup from './RateOfferPopup/RateOfferPopup';

const useStyles = makeStyles(theme => ({
  rateRoot: {
    flexGrow: 1
  },
  ratePaper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  subtitlePaper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.primary
  }
}));

const HistoryOffers = (props: IProfileHistoryOffersProps) => {
  const { trips, feedbacks, userRole } = props;
  const dispatcher = useDispatch();
  const classes = useStyles();

  const [offerRatesVisible, setOfferRatesVisible] = useState<boolean>(false);
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [offerId, setOfferId] = useState<number>();

  /*useEffect(() => {
    dispatcher(actions.getOfferFeedbacksRequest(3));
  }, []);*/

  useEffect(() => {
    console.log(feedbacks);
  }, [feedbacks]);

  const handleFormSubmit = (arg: IFeedback) => {
    const feedback: IFeedback = {
      offerId: arg.offerId,
      scoreOffer: arg.scoreOffer,
      scoreGuide: arg.scoreGuide,
      comment: arg.comment
    };

    dispatcher(actions.addFeedbackRequest(feedback));
    setPopupVisible(false);
  };

  const isRated = (id: number) => {
    if (feedbacks.find((feedback: IGotFeedback) => feedback.offer.id === id)) return true;
    return false;
  };

  return (
    <div>
      {trips &&
        trips.map((trip: IEndedSingleTripType) => (
          <div key={trip.offer.id}>
            <TripListElement trip={trip.offer} />
            <Grid container justify='center'>
              {userRole === 'traveler' && !isRated(trip.offer.id) && (
                <>
                  <Grid item xs={10} sm={7}>
                    <Paper elevation={0} className={classes.ratePaper}>
                      <p>Podobała Ci się ta wycieczka?</p>
                      <p>Podziel się z nami opinią.</p>
                    </Paper>
                  </Grid>
                  <Grid item xs={2} sm={5}>
                    <Paper elevation={0} className={classes.ratePaper}>
                      <AddIcon
                        fontSize='large'
                        className={styles.icon}
                        onClick={() => {
                          setOfferId(trip.offer.id);
                          setPopupVisible(!popupVisible);
                        }}
                      />
                    </Paper>
                  </Grid>
                  <RateOfferPopup
                    offerId={offerId ? offerId : -1}
                    popupVisible={popupVisible}
                    changePopupVisible={() => setPopupVisible(!popupVisible)}
                    onSubmit={handleFormSubmit}
                  />
                </>
              )}
              {userRole === 'traveler' && isRated(trip.offer.id) && (
                <>
                  <Grid item sm={12} xs={12}>
                    <Paper elevation={0} className={classes.subtitlePaper}>
                      <Typography component='p'>Oferta oceniona. Dziękujemy!</Typography>
                    </Paper>
                  </Grid>
                  <TravelerOfferRate feedback={feedbacks.find((feedback: IGotFeedback) => trip.offer.id === feedback.offer.id)} />
                </>
              )}
              {userRole === 'guide' && (
                <Grid item xs={5} sm={5}>
                  <RatesOfferPopup
                    offerId={trip.offer.id}
                    popupVisible={offerRatesVisible}
                    changePopupVisible={() => setOfferRatesVisible(false)}
                  />
                  <Button
                    style={window.innerWidth < 900 ? { marginBottom: '5rem' } : {}}
                    onClick={() => {
                      dispatcher(actions.getOfferFeedbacksRequest(trip.offer.id));
                      setOfferRatesVisible(true);
                    }}
                    type='submit'
                    variant='contained'
                    color='primary'
                    disabled={false}
                  >
                    {i18n.t('Zobacz oceny')}
                  </Button>
                </Grid>
              )}
            </Grid>
          </div>
        ))}
    </div>
  );
};

export default HistoryOffers;
