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
  }, [guideRequest.experience]);

  return (
    <>
      <div className={styles.request__content}>
        <div className={styles.row}>
          <p className={styles.left}>{t('Date')}:</p>
          <p className={styles.right}>{reducedDate}</p>
        </div>
        <div className={styles.row}>
          <p className={styles.left}>{t('Email')}:</p> <p className={styles.right}>{user ? user.email : null}</p>
        </div>
        <div className={styles.row}>
          <p className={styles.left}>{t('Tel')}.:</p> <p className={styles.right}>{user ? user.telephone : null}</p>
        </div>
        <div className={styles.row}>
          <p className={styles.left}>{t('Country')}:</p>
          <p className={styles.right}>{user ? user.country : null}</p>
        </div>
        <div className={styles.row}>
          <p className={styles.left}>{t('Languages')}:</p> <p className={styles.right}>{req.languages.map((lng: string) => `${lng} `)}</p>
        </div>
        <div className={styles.row}>
          <p className={styles.left}>{t('Experience')}:</p> <p className={styles.right}>{experience} </p>
        </div>
        <div className={styles.description}>{req.description}</div>
      </div>
      <div className={styles.request__menu}>
        <div className={styles.title} style={{ marginLeft: '0rem' }}>
          {t('ID')}: {req.id}
        </div>
        <div className={styles.avatar}>
          <img src={user ? user.avatar : ''} alt='' />
        </div>
        <div className={styles.row}>
          <p className={styles.title}>
            {user ? user.firstName : null} {user ? user.lastName : null}{' '}
          </p>
        </div>
        <div className={styles.row}>
          <p style={{ width: '100%', textAlign: 'center' }}>
            {user ? user.gender : null}, {user ? user.age : null}
          </p>
        </div>
      </div>
    </>
  );
};

export default GuideRequest;
