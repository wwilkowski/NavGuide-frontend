import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import GoogleButton from '../../components/GoogleButton/GoogleButton';
import LogoutButton from '../../components/LogoutButton/LogoutButton';
import SwitchLanguageButton from '../../components/SwitchLanguageButton/SwitchLanguageButton';
import { StoreType } from '../../store';
import { logInGoogleRequest, logOutGoogleRequest } from '../Profile/actions';
import { getInterestsRequest, signUpGoogleRequest } from '../Registration/actions';
import styles from './Header.module.scss';
import LogoImage from '../../assets/logo.png';
import MenuIcon from '../../assets/icons/menu.png';

const Header: React.FC = () => {
  const dispatcher = useDispatch();
  const profile = useSelector((state: StoreType) => state.profile);
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

  const [openMenu, setOpenMenu] = useState(false);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);

  return (
    <header className={styles.header}>
      <a href='/' className={styles.header__logoLink}>
        <img src={LogoImage} alt='app logo' className={styles.header__logo} />
        <div className={styles.header__titleCase}>
          <h1 className={styles.header__title}>NavGuide</h1>
          <p className={styles.header__description}>Find your local guides</p>
        </div>
      </a>
      <button className={styles.header__menuButton} onClick={() => setOpenMenu(!openMenu)}>
        <img src={MenuIcon} className={styles.header__menuIcon} alt='' />
      </button>
      <ul className={`${styles.header__menuList} ${!openMenu ? styles.header__hiddenMenu : ''}`}>
        {!profile.isLoggedIn ? (
          <>
            <li>
              <GoogleButton text='Sign up with Google' onSuccess={signUpWithUserCode} onFailure={signUpWithUserCode} />
            </li>
            <li>
              <GoogleButton text='Sign in with Google' onSuccess={signInWithUserCode} onFailure={signInWithUserCode} />
            </li>
          </>
        ) : (
          <ul className={styles.profile}>
            <button className={styles.profile__case} onClick={() => setOpenProfileMenu(!openProfileMenu)}>
              <img src={profile.user.avatar} alt='avatar' className={styles.profile__avatar} />
              <p>{profile.user.firstName}</p>
            </button>
            <ul className={`${styles.profile__menu} ${!openProfileMenu ? styles.profile__hiddenMenu : ''}`}>
              <li>
                <Link to='/profile' className={styles.profile__link}>
                  {t('Profile')}
                </Link>
              </li>
              <li>
                <Link to='/profile/edit' className={styles.profile__link}>
                  {t('Edit profile')}
                </Link>
              </li>
              {profile.user.role === 'ADMIN' ? (
                <li>
                  <Link to='/admin' className={styles.profile__link}>
                    {t('Admin panel')}
                  </Link>
                </li>
              ) : profile.user.role === 'GUIDE' ? (
                <li>
                  <Link to='/offers/create' className={styles.profile__link}>
                    {t('Create new offer')}
                  </Link>
                </li>
              ) : (
                <li>
                  <Link to='/register/guide' className={styles.profile__link}>
                    {t('Become a guide')}
                  </Link>
                </li>
              )}
              <li>
                <LogoutButton onClick={logout} />
              </li>
            </ul>
          </ul>
        )}
        <div className={styles.langButtons}>
          <SwitchLanguageButton code='pl' />
          {` / `}
          <SwitchLanguageButton code='en' />
        </div>
      </ul>
    </header>
  );
};

export default Header;
