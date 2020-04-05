import React from 'react';
import { IAgreementOffer } from '../containers/Offers/types';
import { Button, Typography } from '@material-ui/core';
import i18n from '../locales/i18n';
import { useTranslation } from 'react-i18next';

interface Props {
  agreement?: IAgreementOffer;
  role?: string;
  handleSettleAgreement: (id: number, status: string) => void;
}

const getDate = (date: string) => {
  return date
    .toString()
    .replace('T', ' ')
    .substr(0, date.toString().indexOf('.'));
};

const AgreementInfo = ({ agreement, handleSettleAgreement, role }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <Typography variant='h3'>{t('Date')}</Typography>
      <p>{agreement && getDate(agreement.plannedDate)}</p>
      <Typography variant='h3'>{t('Price')}</Typography>
      <p>{agreement && agreement.price} zł</p>

      <Typography variant='h3'>{t('Description')}</Typography>
      <p>{agreement && agreement.description}</p>

      {role === 'TRAVELER' && (
        <div>
          <Button variant='contained' color='primary' onClick={() => handleSettleAgreement(agreement ? agreement.id : -1, 'ACCEPT')}>
            {i18n.t('Accept')}
          </Button>
          <Button variant='contained' color='primary' onClick={() => handleSettleAgreement(agreement ? agreement.id : -1, 'REJECT')}>
            {i18n.t('Reject')}
          </Button>
        </div>
      )}
    </>
  );
};

export default AgreementInfo;
