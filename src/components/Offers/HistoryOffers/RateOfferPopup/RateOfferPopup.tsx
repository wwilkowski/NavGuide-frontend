import React from 'react';
import { Modal, makeStyles, Backdrop, Fade } from '@material-ui/core';
import { IRateOfferPopupProps } from './types';
import RateOfferForm from '../RateOfferForm/RateOfferForm';

const useStyles = makeStyles(theme => ({
  popupModal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  popupPaper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1),
    width: window.innerWidth < 900 ? '95%' : '37%',
    height: window.innerWidth < 900 ? '60%' : '47%'
  }
}));

const RateOfferPopup = (props: IRateOfferPopupProps) => {
  const classes = useStyles();

  const { popupVisible, changePopupVisible, onSubmit, offerId } = props;

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      className={classes.popupModal}
      open={popupVisible}
      onClose={changePopupVisible}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={popupVisible}>
        <div className={classes.popupPaper}>
          <RateOfferForm offerId={offerId ? offerId : -1} onSubmit={onSubmit} />
        </div>
      </Fade>
    </Modal>
  );
};

export default RateOfferPopup;
