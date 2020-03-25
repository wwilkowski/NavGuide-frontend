import React, { useState, useEffect } from 'react';
import styles from './ListGuideRequests.module.scss';
import { IGuideRequestProps } from './types';
import { useTranslation } from 'react-i18next';
import { IUserProfile } from '../../containers/User/types';

const GuideRequest = ({ guideRequest, userProfile }: IGuideRequestProps) => {
  const { t } = useTranslation();

  const req = guideRequest;

  const [user, setUser] = useState<IUserProfile>();
  const [reducedDate, setReducedDate] = useState<string>('');
  const [experience, setExperience] = useState<string>('');

  useEffect(() => {
    if (!user) setUser(userProfile);
  }, [userProfile, user]);

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
    <div className={styles.container}>
      <div>
        <img src={user ? user.avatar : ''} alt='' className={styles.avatar} />
      </div>
      <div className={styles.infos}>
        <div className={styles.case}>
          <div className={styles.info}>
            <p className={styles.title}>{t('Date')}:</p>
            <p>{reducedDate}</p>
          </div>
          <div className={styles.info}>
            <p className={styles.title}>{t('ID')}:</p>
            <p>{req.id}</p>
          </div>
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
        </div>
        <div className={styles.case}>
          <div className={styles.info}>
            <p className={styles.title}>{t('Tel')}.:</p>
            <p>{user ? user.telephone : null}</p>
          </div>
          <div className={styles.info}>
            <p className={styles.title}>{t('Country')}:</p>
            <p>{user ? user.country : null}</p>
          </div>
          <div className={styles.info}>
            <p className={styles.title}>{t('Languages')}:</p>
            <p>{req.languages.map((lng: string) => `${lng} `)}</p>
          </div>
          <div className={styles.info}>
            <p className={styles.title}>{t('Experience')}:</p>
            <p>{experience} </p>
          </div>
        </div>
        <div className={`${styles.case} ${styles.description}`}>{req.description}</div>
      </div>
    </div>
  );
};

export default GuideRequest;
