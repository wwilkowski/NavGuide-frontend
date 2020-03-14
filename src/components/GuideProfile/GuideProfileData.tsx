import React, { useState, useEffect } from 'react';
import styles from './GuideProfileData.module.scss';
import { IGuideProfileDataProps } from '../../containers/GuideProfile/types';
import { useTranslation } from 'react-i18next';
import back from '../../assets/icons/back.png';

const GuideProfileData = (props: IGuideProfileDataProps) => {
  const { profileData, profile, goBack } = props;

  const { t } = useTranslation();

  const [experience, setExperience] = useState<string>('');
  const [telephone, setTelephone] = useState<string>('');

  useEffect(() => {
    let tmp = '';
    for (let i = 0; i < profile.experience; i++) {
      tmp += '★';
    }
    for (let i = profile.experience; i < 5; i++) {
      tmp += '☆';
    }
    setExperience(tmp);
  }, [profileData, profile.experience]);

  useEffect(() => {
    let result = '';
    const tmp = profileData.telephone.split('');

    result = '+' + tmp[0] + tmp[1] + ' ' + tmp[2] + tmp[3] + tmp[4] + ' ' + tmp[5] + tmp[6] + tmp[7] + ' ' + tmp[8] + tmp[9] + tmp[10];
    setTelephone(result);
  }, [profileData.telephone]);

  return (
    <div className={styles.container}>
      <div className={styles.container__title}>
        {t('Profile')}
        <div className={styles.backButton} onClick={goBack}>
          <img src={back} alt='' />
        </div>
      </div>
      <div className={styles.avatar}>
        <img src={profileData.avatar} alt='' />
      </div>
      <div className={styles.data1}>
        <p>
          {profileData.firstName} {profileData.lastName}
        </p>
        <p className={styles.small}>
          ({profileData.age}, {profileData.gender})
        </p>
      </div>
      <div className={styles.data2}>
        <p className={styles.left}>{t('Experience')}</p>
        <p className={styles.right}>{experience}</p>
        <p className={styles.left}>{t('Average mark')}</p>
        <p className={styles.right}>{profile.averageMark > 0 ? profile.averageMark : 0}</p>
        <p className={styles.title}>{t('Contact')}</p>
        <p className={styles.left}>{t('Tel')}</p>
        <p className={styles.right}>{telephone}</p>
        <p className={styles.left} style={{ width: '15%' }}>
          {t('Email')}
        </p>
        <p className={styles.right} style={{ width: '85%' }}>
          {profileData.email}
        </p>
        <p className={styles.title}>{t('Speech')}</p>
        <p className={styles.left}>{t('Country')}</p>
        <p className={styles.right}>{profileData.country}</p>
        <p className={styles.left}>{t('Languages')}</p>
        <p className={styles.right}>{profile.languages.map((lng: string) => `${lng} `)}</p>
        <p className={styles.title}>{t('Interests')}</p>
        <div className={styles.data2__interests}>
          {profileData.interests.map((el: { id: number; name: string }) => (
            <div key={el.id} className={styles.data2__interest}>
              {el.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuideProfileData;
