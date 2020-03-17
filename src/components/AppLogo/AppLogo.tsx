import React from 'react';
import LogoImage from '../../assets/logo.png';
import styles from './styles.module.scss';

const AppLogo = () => {
  return (
    <a href='/' className={styles.link}>
      <img src={LogoImage} alt='app logo' className={styles.logo} />
      <div className={styles.case}>
        <h1 className={styles.title}>NavGuide</h1>
        <p className={styles.subtitle}>Find your local guides</p>
      </div>
    </a>
  );
};

export default AppLogo;
