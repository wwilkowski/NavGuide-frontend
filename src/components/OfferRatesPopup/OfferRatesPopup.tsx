import React from 'react';
import { Modal, makeStyles, Backdrop, Fade } from '@material-ui/core';
import { IOfferRatesProps } from './types';

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
    width: '30%',
    height: '47%'
  }
}));

const OfferRatesPopup = (props: IOfferRatesProps) => {
  const classes = useStyles();
  const { popupVisible, changePopupVisible } = props;
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
        <div className={classes.popupPaper}></div>
      </Fade>
    </Modal>
  );
};

export default OfferRatesPopup;
