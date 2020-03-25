import React, { useState, useEffect } from 'react';
import styles from './GuideProfileData.module.scss';
import { IGuideProfileDataProps } from '../../containers/GuideProfile/types';
import { useTranslation } from 'react-i18next';
import back from '../../assets/icons/back.png';

const GuideProfileData = (props: IGuideProfileDataProps) => {
  const { profileData, profile, goBack } = props;

  const { t } = useTranslation();

  const [experience, setExperience] = useState<string>('');
  // eslint-disable-next-line
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

  const getLanguage = (code: string) => {
    switch (code) {
      case 'PL':
        return t('Polish');
      case 'EN':
        return t('English');
      case 'DE':
        return t('German');
    }
  };

  const getCountry = (code: string) => {
    switch (code) {
      case 'PL':
        return t('Poland');
      case 'EN':
        return t('England');
      case 'DE':
        return t('Germany');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__title}>
        {t('Guide profile')}
        <div className={styles.backButton} onClick={goBack}>
          <img src={back} alt='' />
        </div>
      </div>
      <img src={profile.avatar} alt='' className={styles.avatar} />
      <p className={styles.guideName}>
        {profile.firstName} {profile.lastName}
      </p>
      <p>
        ({profileData.age}, {t(profileData.gender)})
      </p>
      <div className={styles.section}>
        <div className={styles.info}>
          <p className={styles.subtitle}>{t('Experience')}:</p>
          <p>{experience}</p>
        </div>
        <div className={styles.info}>
          <p className={styles.subtitle}>{t('Average mark')}:</p>
          <p>{profile.averageMark > 0 ? profile.averageMark : 0}</p>
        </div>
      </div>
      <div className={styles.section}></div>
      <div className={styles.section}>
        <h2 className={styles.title}>{t('Speech')}</h2>
        <div className={styles.info}>
          <p className={styles.subtitle}>{t('Country')}:</p>
          <p>{getCountry(profileData.country)}</p>
        </div>
        <div className={styles.info}>
          <p className={styles.subtitle}>{t('Languages')}:</p>
          <p>{profile.languages.map((lng: string) => `${getLanguage(lng)} `)}</p>
        </div>
      </div>
    </div>
  );
};

export default GuideProfileData;
