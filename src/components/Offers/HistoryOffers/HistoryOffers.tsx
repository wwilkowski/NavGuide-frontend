import React, { useState, useEffect } from 'react';
import { IProfileHistoryOffersProps, IFeedback } from '../../../containers/Offers/types';
import { IEndedSingleTripType } from '../../../containers/TripBrowser/types';
import TripListElement from '../../TripBrowser/TripListElement';
import { useTranslation } from 'react-i18next';
import * as actions from '../../../containers/Offers/actions';
import { useDispatch } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles, Typography, Button } from '@material-ui/core';
import RateOfferForm from '../RateOfferForm/RateOfferForm';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import styles from './HistoryOffers.module.scss';
import i18n from '../../../locales/i18n';
import OfferRatesPopup from '../../OfferRatesPopup/OfferRatesPopup';
import TravelerOfferRate from './TravelerOfferRate';

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
  },
  popupModal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  popupPaper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1),
    width: '30%',
    height: '47%'
  }
}));

const HistoryOffers = (props: IProfileHistoryOffersProps) => {
  const { trips, feedbacks, userRole } = props;
  const { t } = useTranslation();
  const dispatcher = useDispatch();
  const classes = useStyles();

  const [offerRatesVisible, setOfferRatesVisible] = useState<boolean>(false);
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [offerId, setOfferId] = useState<number>();

  useEffect(() => {
    console.log(feedbacks);
  }, [feedbacks]);

  const handleFormSubmit = (arg: IFeedback) => {
    const feedback: IFeedback = {
      scoreOffer: arg.scoreOffer,
      scoreGuide: arg.scoreGuide,
      comment: arg.comment
    };

    dispatcher(actions.addFeedbackRequest(feedback));
    setPopupVisible(false);
  };

  const isRated = () => {
    return true;
  };

  return (
    <div>
      {trips &&
        trips.map((trip: IEndedSingleTripType) => (
          <div key={trip.offer.id}>
            <TripListElement trip={trip.offer} />
            <Grid container justify='center'>
              {userRole === 'traveler' && !isRated() && (
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
                </>
              )}
              {userRole === 'traveler' && isRated() && (
                <>
                  <Grid item sm={12} xs={12}>
                    <Paper elevation={0} className={classes.subtitlePaper}>
                      <Typography component='p'>Oferta oceniona. Dziękujemy!</Typography>
                    </Paper>
                  </Grid>
                  <TravelerOfferRate scoreGuide={3} scoreOffer={3} description={'test'} />
                </>
              )}
              {userRole === 'guide' && (
                <Grid item xs={5} sm={5}>
                  <OfferRatesPopup popupVisible={offerRatesVisible} changePopupVisible={() => setOfferRatesVisible(false)} />
                  <Button
                    onClick={() => {
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
      {/* to przeniesc */}
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.popupModal}
        open={popupVisible}
        onClose={() => setPopupVisible(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={popupVisible}>
          <div className={classes.popupPaper}>
            <RateOfferForm offerId={offerId ? offerId : -1} onSubmit={handleFormSubmit} />
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default HistoryOffers;
