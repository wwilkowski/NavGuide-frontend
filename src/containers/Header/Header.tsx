import React from 'react';
import { Link } from 'react-router-dom';
import GoogleButton from '../../components/GoogleButton/GoogleButton';
import { useDispatch, useSelector } from 'react-redux';
import { signUpGoogleRequest } from '../Registration/actions';
import { logInGoogleRequest, logOutGoogleRequest } from '../Login/actions';
import SwitchLanguageButton from '../../components/SwitchLanguageButton';
import { StoreType } from '../../store';
import { useTranslation } from 'react-i18next';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const { t } = useTranslation();

  const registrationInProgress = useSelector((state: StoreType) => state.registration.registrationInProgress);
  const isLoggedIn = useSelector((state: StoreType) => state.login.isLoggedIn);
  const dispatcher = useDispatch();

  const signUpWithUserCode = (code: string) => {
    dispatcher(signUpGoogleRequest(code));
  };
  const signInWithUserCode = (code: string) => {
    dispatcher(logInGoogleRequest(code));
  };

  const logout = (code: string) => {
    dispatcher(logOutGoogleRequest(code));
  };

  return (
    <header className={styles.header}>
      <Link to='/'>{t('Home')}</Link>
      <Link to='/profile'>{t('Profile')}</Link>
      {!registrationInProgress && !isLoggedIn && (
        <GoogleButton text='Sign up with Google' onSuccess={signUpWithUserCode} onFailure={signUpWithUserCode} />
      )}
      {isLoggedIn ? (
        <GoogleButton text='Log out' onSuccess={logout} onFailure={logout} />
      ) : (
        <GoogleButton text='Sign in with Google' onSuccess={signInWithUserCode} onFailure={signInWithUserCode} />
      )}
      <SwitchLanguageButton code='pl' />
      <SwitchLanguageButton code='en' />
    </header>
  );
};

export default Header;
