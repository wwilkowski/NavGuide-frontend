import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTranslation } from 'react-i18next';
import { Button } from '@material-ui/core';

const VerifyPopup = (props) => {
  const { t } = useTranslation();
  return (
    <Dialog
      open={props.popupVisible}
      onClose={props.changePopupVisible}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{t('Are you sure?')}</DialogTitle>
      <DialogActions>
        <Button
          onClick={() => {
            props.onSubmit();
            props.changePopupVisible();
          }}
          color='primary'
        >
          {t('Yes')}
        </Button>
        <Button
          onClick={() => {
            props.changePopupVisible();
          }}
          color='primary'
          autoFocus
        >
          {t('Maybe later')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VerifyPopup;
