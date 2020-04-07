import React from 'react';
import LogoImage from '../../assets/logo.png';
import styles from './styles.module.scss';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const AppLogo = () => {
  const { t } = useTranslation();
  return (
    <a href='/' className={styles.link}>
      <img src={LogoImage} alt='app logo' className={styles.logo} />
      <div className={styles.case}>
        <Typography component='h1' variant='h4'>
          NavGuide
        </Typography>
        <Typography component='p' variant='subtitle1'>
          {t('Find your local guides')}
        </Typography>
      </div>
    </a>
  );
};

export default AppLogo;
