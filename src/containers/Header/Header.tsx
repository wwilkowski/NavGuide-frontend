/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import GoogleButton from '../../components/GoogleButton/GoogleButton';
import LogoutButton from '../../components/LogoutButton/LogoutButton';
import SwitchLanguageButton from '../../components/SwitchLanguageButton/SwitchLanguageButton';
import { StoreType } from '../../store';
import { logInGoogleRequest, logOutGoogleRequest } from '../Profile/actions';
import { getInterestsRequest, signUpGoogleRequest } from '../Registration/actions';

const Header: React.FC = () => {
  const dispatcher = useDispatch();
  const registrationInProgress = useSelector((state: StoreType) => state.registration.registrationInProgress);
  const isLoggedIn = useSelector((state: StoreType) => state.profile.isLoggedIn);
  const { t } = useTranslation();

  const signUpWithUserCode = (code: string) => {
    dispatcher(signUpGoogleRequest(code));
    dispatcher(getInterestsRequest());
  };
  const signInWithUserCode = (code: string) => {
    dispatcher(logInGoogleRequest(code));
  };

  const logout = () => {
    dispatcher(logOutGoogleRequest());
  };

  return (
    <nav className='navbar' role='navigation' aria-label='main navigation'>
      <div className='navbar-brand'>
        <a className='navbar-item' href='/'>
          <h1 className='has-text-weight-bold	'>Lorem ipsum</h1>
        </a>
      </div>

      <div id='navbarBasicExample' className='navbar-menu is-active'>
        <div className='navbar-start'>
          <Link to='/' className='navbar-item'>
            {t('Home')}
          </Link>

          <Link to='/profile' className='navbar-item'>
            {t('Profile')}
          </Link>
        </div>

        <div className='navbar-end'>
          <div className='navbar-item'>
            <div className='buttons'>
              {!registrationInProgress && !isLoggedIn && (
                <GoogleButton text='Sign up with Google' onSuccess={signUpWithUserCode} onFailure={signUpWithUserCode} />
              )}
              {isLoggedIn ? (
                <LogoutButton onClick={logout} />
              ) : (
                <GoogleButton text='Sign in with Google' onSuccess={signInWithUserCode} onFailure={signInWithUserCode} />
              )}
              <SwitchLanguageButton code='pl' />
              <SwitchLanguageButton code='en' />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
