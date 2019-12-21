import React from 'react';
import { Link } from 'react-router-dom';
import GoogleButton from '../../components/GoogleButton/GoogleButton';
import { useDispatch, useSelector } from 'react-redux';
import { signUpGoogleRequest, getInterestsRequest } from '../Registration/actions';
import { logInGoogleRequest, logOutGoogleRequest } from '../Login/actions';
import SwitchLanguageButton from '../../components/SwitchLanguageButton';
import { StoreType } from '../../store';
import { useTranslation } from 'react-i18next';
import LogoutButton from '../../components/LogoutButton/LogoutButton';

const Header: React.FC = () => {
  const { t } = useTranslation();

  const registrationInProgress = useSelector((state: StoreType) => state.registration.registrationInProgress);
  const isLoggedIn = useSelector((state: StoreType) => state.login.isLoggedIn);
  const dispatcher = useDispatch();

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
          <h1 className='has-text-weight-bold	'> Lorem ipsum</h1>
        </a>
      </div>

      <div id='navbarBasicExample' className='navbar-menu'>
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
