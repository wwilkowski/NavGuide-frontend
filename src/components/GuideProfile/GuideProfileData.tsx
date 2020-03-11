import React, { useState, useEffect } from 'react';
import styles from './GuideProfileData.module.scss';
import { IGuideProfileDataProps } from '../../containers/GuideProfile/types';
import { useTranslation } from 'react-i18next';
import back from '../../assets/icons/back.png';

const GuideProfileData = (props: IGuideProfileDataProps) => {
  const { profileData, profile, goBack } = props;

  const { t } = useTranslation();

  const [experience, setExperience] = useState<string>('');

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
        <p className={styles.title}>{t('Contact')}</p>
        <p className={styles.left}>{t('Tel')}</p>
        <p className={styles.right}>{profileData.telephone}</p>
        <p className={styles.left}>{t('Email')}</p>
        <p className={styles.right}>{profileData.email}</p>
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
