import React from 'react';
import { IAgreementOffer } from '../containers/Offers/types';
import { Button } from '@material-ui/core';
import i18n from '../locales/i18n';

interface Props {
  agreement?: IAgreementOffer;
  handleSettleAgreement: (id: number, status: string) => void;
}

const AgreementInfo = ({ agreement, handleSettleAgreement }: Props) => {
  return (
    <>
      <p>Data: {agreement && agreement.plannedDate}</p>
      <p>Cena: {agreement && agreement.price}</p>
      <p>Opis: {agreement && agreement.description}</p>
      <Button variant='contained' color='primary' onClick={() => handleSettleAgreement(agreement ? agreement.id : -1, 'ACCEPT')}>
        {i18n.t('Accept')}
      </Button>
      <Button variant='contained' color='primary' onClick={() => handleSettleAgreement(agreement ? agreement.id : -1, 'REJECT')}>
        {i18n.t('Reject')}
      </Button>
    </>
  );
};

export default AgreementInfo;
