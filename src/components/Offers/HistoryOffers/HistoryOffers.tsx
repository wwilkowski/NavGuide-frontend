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
import { makeStyles } from '@material-ui/core';
import RateOfferForm from '../RateOfferForm/RateOfferForm';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1),
    width: '30%',
    height: '47%'
  }
}));

const HistoryOffers = (props: IProfileHistoryOffersProps) => {
  const { trips } = props;
  const { t } = useTranslation();
  const dispatcher = useDispatch();
  const classes = useStyles();

  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [offerId, setOfferId] = useState<number>();
  const [filteredTrips, setFilteredTrips] = useState<IEndedSingleTripType[]>();

  useEffect(() => {
    const tmp = trips.filter((trip: IEndedSingleTripType) => new Date().getTime() >= new Date(trip.date).getTime());
    setFilteredTrips(tmp);
  }, [trips]);

  const handleFormSubmit = (arg: IFeedback) => {
    const feedback: IFeedback = {
      offerId: offerId ? offerId : -1,
      scoreOffer: arg.scoreOffer,
      scoreGuide: arg.scoreGuide,
      comment: arg.comment
    };
    console.log(feedback);

    dispatcher(actions.addFeedbackRequest(feedback));
    setPopupVisible(false);
  };

  return (
    <div>
      {filteredTrips &&
        filteredTrips.map((trip: IEndedSingleTripType) => (
          <div key={trip.offer.id}>
            <TripListElement trip={trip.offer} />
            <p>Podobała Ci się ta wycieczka?</p>
            <p>Podziel się z nami opinią.</p>
            <button
              onClick={() => {
                setOfferId(trip.offer.id);
                setPopupVisible(!popupVisible);
              }}
            >
              {t('Rate')}
            </button>
            {/*{trips &&
              trips.map((trip: IEndedSingleTripType) => (
                <div key={trip.offer.id}>
                  <TripListElement trip={trip.offer} />
                </div>
              ))} */}
          </div>
        ))}
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={popupVisible}
        onClose={() => setPopupVisible(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={popupVisible}>
          <div className={classes.paper}>
            <RateOfferForm offerId={offerId ? offerId : -1} onSubmit={handleFormSubmit} />
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default HistoryOffers;
