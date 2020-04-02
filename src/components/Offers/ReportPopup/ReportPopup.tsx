import React, { useState, ChangeEvent, useEffect } from 'react';
import { makeStyles, Paper, Typography, Grid } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { IReportPopupProps } from './types';
import { useTranslation } from 'react-i18next';
import { reportOfferRequest } from '../../../containers/Offers/actions';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    width: window.innerWidth > 900 ? '20%' : '100%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  textField: {
    padding: theme.spacing(2),
    width: '100%'
  },
  button: {
    margin: theme.spacing(2, 0, 0)
  }
}));

const ReportPopup = (props: IReportPopupProps) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatcher = useDispatch();

  const { changeVisibility, popupVisibility, offerId } = props;

  const [message, setMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  useEffect(() => {
    if (errorMessage) {
      if (message.length >= 10) setErrorMessage(false);
    }
  }, [errorMessage, message]);

  const handleClick = () => {
    if (message.length < 10) setErrorMessage(true);
    else {
      setErrorMessage(false);
      dispatcher(reportOfferRequest(offerId, message));
      setMessage('');
      changeVisibility();
    }
  };

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      className={classes.modal}
      open={popupVisibility}
      onClose={changeVisibility}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={popupVisibility}>
        <Paper className={classes.paper}>
          <Grid container justify='center' xs={12} sm={12}>
            <Grid container justify='center' xs={12} sm={12}>
              <Typography variant='h6'>{t('Tell us what is wrong with this offer')}</Typography>
            </Grid>
            <Grid container justify='center' xs={12} sm={12}>
              <TextField
                className={classes.textField}
                id='outlined-textarea'
                label={t('Description')}
                multiline
                rows={3}
                variant='outlined'
                value={message}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setMessage(e.target.value);
                }}
              />
            </Grid>
            {errorMessage ? (
              <Grid container justify='center' alignItems='flex-start' xs={12} sm={12}>
                <Typography variant='subtitle2' color='error'>
                  Min number of charaters is 10!
                </Typography>
              </Grid>
            ) : null}
            <Grid container justify='center' xs={12} sm={12}>
              <Button className={classes.button} onClick={handleClick} variant='contained' color='primary'>
                {t('Send')}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default ReportPopup;
