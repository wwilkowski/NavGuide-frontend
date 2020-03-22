import React from 'react';
import { useTranslation } from 'react-i18next';
import { IUserData } from '../../shared/types';
import styles from './styles.module.scss';

interface Props {
  user: IUserData;
}

const UserProfile = ({ user }: Props) => {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <img src={user.avatar} alt='' className={styles.avatar} />
      <div className={styles.informations}>
        <div className={styles.info}>
          <p className={styles.title}>{t('First name')}</p>
          <p>{user.firstName}</p>
        </div>
        <div className={styles.info}>
          <p className={styles.title}>{t('Last name')}</p>
          <p>{user.lastName}</p>
        </div>
        <div className={styles.info}>
          <p className={styles.title}>{t('Email')}</p>
          <p>{user.email}</p>
        </div>
        <div className={styles.info}>
          <p className={styles.title}>{t(`Experience`)}: </p>
          <p>{user.experience}</p>
        </div>
        <div className={styles.info}>
          <p className={styles.title}>{t(`Country`)}: </p>
          <p>{user.country}</p>
        </div>
        <div className={styles.info}>
          <p className={styles.title}>{t(`Tel`)}: </p>
          <p>{user.telephone}</p>
        </div>

        <ul className={styles.tagList}>
          {user.interests.map((interest, index) => (
            <li key={index} className={styles.tag}>
              <p>{t(interest.name)}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
