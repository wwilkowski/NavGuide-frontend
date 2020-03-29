import React, { useState } from 'react';
import TripListElement from '../../TripBrowser/TripListElement';
import { IAgreementTravelerProps } from './types';
import { useTranslation } from 'react-i18next';
import VerifyPopup from '../../../shared/VerifyPopup';

const getDate = (date: string) => {
  return date
    .toString()
    .replace('T', ' ')
    .substr(0, date.toString().indexOf('.'));
};

const SettleAgreement = (props: IAgreementTravelerProps) => {
  const { t } = useTranslation();

  const { currentAgreement, handleSettleAgreement } = props;

  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('');

  return (
    <div>
      <p>
        {t('Planned Date')}: {getDate(currentAgreement.plannedDate)}
      </p>
      <TripListElement trip={currentAgreement.offer} />
      <p>
        {t('Price')}: {currentAgreement.price}zł {t(currentAgreement.offer.priceType)}
      </p>
      <p>{t('Description')}</p>
      <p>{currentAgreement.description}</p>
      <button
        onClick={() => {
          setStatus('ACCEPT');
          setPopupVisible(true);
        }}
      >
        {t('Accept')}
      </button>
      <button
        onClick={() => {
          setStatus('REJECT');
          setPopupVisible(true);
        }}
      >
        {t('Reject')}
      </button>
      <VerifyPopup
        onSubmit={() => {
          if (status === 'ACCEPT') {
            handleSettleAgreement(currentAgreement.id, 'ACCEPT');
          } else {
            handleSettleAgreement(currentAgreement.id, 'REJECT');
          }
          setPopupVisible(!popupVisible);
        }}
        popupVisible={popupVisible}
        changePopupVisible={() => setPopupVisible(!popupVisible)}
      />
    </div>
  );
};

export default SettleAgreement;
