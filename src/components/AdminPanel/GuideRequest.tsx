import React, { useState, useEffect } from 'react';
import styles from './ListGuideRequests.module.scss';
import { IGuideRequestProps } from './types';
import { useTranslation } from 'react-i18next';
import { IUserProfile } from '../../containers/User/types';

const GuideRequest = ({ guideRequest, userProfile }: IGuideRequestProps) => {
  const { t } = useTranslation();

  const req = guideRequest;

  const [user, setUser] = useState<IUserProfile>();

  useEffect(() => {
    if (!user) setUser(userProfile);
  }, [userProfile]);

  return (
    <div className={styles.request} key={req.id}>
      <div className={styles.request__content}>
        <div className={styles.row}>
          <div style={{ width: '30%' }}>
            <b>{t('ID')}:</b> {req.id}
          </div>
          <div style={{ width: '70%' }}>
            <b>{t('Created at')}:</b> {req.date}
          </div>
        </div>
        <div className={styles.row}>
          <div style={{ minWidth: '50%' }}>
            <b>{t('Email')}:</b> {user ? user.email : null}
          </div>
          <div style={{ marginLeft: '0.5rem' }}>
            <b>{t('Tel')}.:</b> {user ? user.telephone : null}
          </div>
        </div>
        <div className={styles.row}>
          <div style={{ width: '50%' }}>
            <b>{t('Country')}: </b>
            {user ? user.country : null}
          </div>
          <div style={{ width: '50%' }}>
            <b>{t('Languages')}:</b> {req.languages.map((lng: string) => `${lng} `)}
          </div>
        </div>
        <div className={styles.row}>
          <div>
            <b>{t('Experience')}:</b> {req.experience}
          </div>
        </div>
        <div className={styles.description}>{req.description}</div>
      </div>
      <div className={styles.request__menu}>
        <div className={styles.avatar}>
          <img src={user ? user.avatar : ''} alt='' />
        </div>
        <div className={styles.row}>
          <div style={{ width: '100%', textAlign: 'center', marginTop: '0.2rem' }}>
            <b>
              {user ? user.firstName : null} {user ? user.lastName : null}
            </b>
          </div>
        </div>
        <div className={styles.row}>
          <b>{t('Gender')}:</b> {user ? user.gender : null}
        </div>
        <div className={styles.row}>
          <b>{t('Age')}:</b> {user ? user.age : null}
        </div>
      </div>
    </div>
  );
};

export default GuideRequest;
