import React from 'react';
import { Modal, makeStyles, Backdrop, Fade, Grid, Paper, Typography } from '@material-ui/core';
import { IOfferRatesProps } from './types';
import { StoreType } from '../../../../store';
import { useSelector } from 'react-redux';
import { IGotFeedback } from '../../../../containers/Offers/types';
import GuideOfferRate from '../GuideOfferRate';

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
    height: '47%',
    overflowY: 'auto'
  },
  popupFooter: {
    padding: theme.spacing(2)
  }
}));

const RatesOfferPopup = (props: IOfferRatesProps) => {
  const classes = useStyles();
  const { popupVisible, changePopupVisible } = props;
  const feedbacks = useSelector((state: StoreType) => state.currentOfferReducer.feedbacks);
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
        <Paper className={classes.popupPaper}>
          <Grid container sm={12} spacing={1}>
            <Grid container justify='center' sm={12}>
              <Typography component='p' variant='h3'>
                Oceny wycieczki
              </Typography>
            </Grid>
            <Grid container justify='center' sm={12}>
              <Typography component='p' variant='h3'>
                {feedbacks && feedbacks[0].offer.name}
              </Typography>
            </Grid>
            <Grid item sm={12}>
              {feedbacks && feedbacks.map((feedback: IGotFeedback) => <GuideOfferRate feedback={feedback} />)}
            </Grid>
            <Grid container justify='flex-end' sm={12}>
              <p className={classes.popupFooter}>Łączna ilość ocen: {feedbacks && feedbacks.length}</p>
            </Grid>
          </Grid>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default RatesOfferPopup;
