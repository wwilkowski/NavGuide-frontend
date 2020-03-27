import React, { useState, ChangeEvent, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { IReportPopupProps } from './types';
import { useTranslation } from 'react-i18next';
import { reportOfferRequest } from '../../../containers/Offers/actions';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../../helpers/notification';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
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
  }, [message]);

  const handleClick = () => {
    if (message.length < 10) setErrorMessage(true);
    else {
      setErrorMessage(false);
      dispatcher(reportOfferRequest(offerId, message));
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
        <div className={classes.paper}>
          <p>{t('Tell us what is wrong with this offer')}</p>
          <div>
            <TextField
              id='outlined-textarea'
              label={t('Description')}
              multiline
              variant='outlined'
              value={message}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setMessage(e.target.value);
              }}
            />
          </div>
          {errorMessage ? <div>Min number of charaters is 10</div> : null}
          <Button onClick={handleClick} variant='contained' color='primary'>
            {t('Send')}
          </Button>
        </div>
      </Fade>
    </Modal>
  );
};

export default ReportPopup;
