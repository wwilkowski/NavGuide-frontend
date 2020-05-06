import React, { useState, useEffect } from 'react';
import styles from './ListGuideRequests.module.scss';
import { IGuideRequestProps } from './types';
import { useTranslation } from 'react-i18next';
const getTelephone = (number: string) => {
  return '+48 ' + number[2] + number[3] + number[4] + ' ' + number[5] + number[6] + number[7] + ' ' + number[8] + number[9] + number[10];
};

const GuideRequest = ({ guideRequest, userProfile }: IGuideRequestProps) => {
  const { t } = useTranslation();

  const req = guideRequest;
  const user = userProfile;

  const [reducedDate, setReducedDate] = useState<string>('');
  const [experience, setExperience] = useState<string>('');

  useEffect(() => {
    const index = req.date.indexOf('.');
    setReducedDate(req.date.substr(0, index).replace('T', ' '));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guideRequest]);

  useEffect(() => {
    let tmp = '';
    for (let i = 0; i < guideRequest.experience; i++) {
      tmp += '★';
    }
    for (let i = guideRequest.experience; i < 5; i++) {
      tmp += '☆';
    }
    setExperience(tmp);
  }, [guideRequest.experience, req.date]);

  return (
    <>
      <div className={styles.request__date}>
        <span>{t('Date')}:</span> {reducedDate}
      </div>
      <div className={styles.request__avatar}>
        <img src={user ? user.avatar : ''} alt='' />
      </div>
      <div className={styles.request__infos}>
        <div className={styles.info}>
          <p className={styles.title}>{t('First name')}</p>
          <p>{user ? user.firstName : ''}</p>
        </div>
        <div className={styles.info}>
          <p className={styles.title}>{t('Last name')}</p>
          <p>{user ? user.lastName : ''}</p>
        </div>

        <div className={styles.info}>
          <p className={styles.title}>{t('Email')}:</p>
          <p>{user ? user.email : null}</p>
        </div>

        <div className={styles.info}>
          <p className={styles.title}>{t('Tel')}.:</p>
          <p>{user ? getTelephone(user.telephone) : null}</p>
        </div>
        <div className={styles.info2}>
          <p className={styles.title}>{t('Country')}:</p>
          <p>{user ? ` ${user.country}` : null}</p>
        </div>
        <div className={styles.info2}>
          <p className={styles.title}>{t('Languages')}:</p>
          <p>{req.languages.map((lng: string) => ` ${lng} `)}</p>
        </div>
        <div className={styles.info}>
          <p className={styles.title}>{t('Experience')}:</p>
          <p>{experience} </p>
        </div>
      </div>
      <div className={styles.request__description}>
        <p>{guideRequest.description}</p>
      </div>
    </>
  );
};

export default GuideRequest;
