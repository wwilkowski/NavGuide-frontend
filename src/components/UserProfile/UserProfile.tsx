import React from 'react';
import { useTranslation } from 'react-i18next';
import { IUserData } from '../../shared/types';
import styles from './styles.module.scss';
import Rating from '@material-ui/lab/Rating';
import poland from '../../assets/icons/poland.png';
import phone from '../../assets/icons/phone.png';
import mail from '../../assets/icons/mail.png';

interface Props {
  user: IUserData;
}

const getTelephone = (number: string) => {
  return '+48 ' + number[2] + number[3] + number[4] + ' ' + number[5] + number[6] + number[7] + ' ' + number[8] + number[9] + number[10];
};

const UserProfile = ({ user }: Props) => {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <img src={user.avatar} alt='' className={styles.avatar} />
      <div className={styles.informations}>
        <div className={styles.informations__row1}>
          {user.firstName} {user.lastName}
        </div>
        <div className={styles.informations__row2}>
          {user.age}, {t(user.gender)}
        </div>
        <div className={styles.informations__row3}>
          {t(user.country)}
          {user.country === 'PL' && <img src={poland} alt='pl' />}
        </div>
        <div className={styles.informations__row4}>
          <p className={styles.title}>{t('Experience in travelling')}:</p>
          <Rating className={styles.stars} value={user.experience} readOnly />
        </div>
        <div className={styles.informations__row5}>
          {t('Contact details')}:
          <div className={styles.line}>
            <img src={phone} alt='phone' />
            <p>{getTelephone(user.telephone)}</p>
          </div>
          <div className={styles.line}>
            <img src={mail} alt='mail' />
            <p>{user.email}</p>
          </div>
        </div>
        <ul className={styles.tagList}>
          <label>{t('Interests')}:</label>
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
