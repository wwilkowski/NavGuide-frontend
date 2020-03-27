import React from 'react';
import LogoImage from '../../assets/logo.png';
import styles from './styles.module.scss';
import { Typography } from '@material-ui/core';

const AppLogo = () => {
  return (
    <a href='/' className={styles.link}>
      <img src={LogoImage} alt='app logo' className={styles.logo} />
      <div className={styles.case}>
        <Typography component='h1' variant='h4'>
          NavGuide
        </Typography>
        <Typography component='p' variant='subtitle1'>
          Find your local guides
        </Typography>
      </div>
    </a>
  );
};

export default AppLogo;
