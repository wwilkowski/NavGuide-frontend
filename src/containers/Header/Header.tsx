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
import MenuIcon from '../../assets/icons/menu.png';
import AppLogo from '../../components/AppLogo/AppLogo';
import styles from './Header.module.scss';
import ProfileIcon from '../../assets/icons/002-user.png';
import CreateOfferIcon from '../../assets/icons/003-pen.png';
import AdminPanelIcon from '../../assets/icons/004-settings.png';
import BecomeGuideIcon from '../../assets/icons/005-instruction.png';

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
  // const [openProfileMenu, setOpenProfileMenu] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.menuActions}>
        <AppLogo />
        <button onClick={() => setOpenMenu(!openMenu)} className={styles.menuToggler}>
          <img src={MenuIcon} alt='' className={styles.menuIcon} />
        </button>
      </div>
      <div
        className={`${styles.mainMenu} ${!openMenu ? styles.hidden : ''}`}
        onClick={() => {
          setOpenMenu(false);
        }}
      >
        {!profile.isLoggedIn ? (
          <ul className={styles.loginMenu}>
            <li className={styles.loginMenuElement}>
              <GoogleButton text='Sign up with Google' onSuccess={signUpWithUserCode} onFailure={signUpWithUserCode} />
            </li>
            <li className={styles.loginMenuElement}>
              <GoogleButton text='Sign in with Google' onSuccess={signInWithUserCode} onFailure={signInWithUserCode} />
            </li>
          </ul>
        ) : (
          <ul className={styles.userMenu}>
            <div className={styles.userCase}>
              <Link to='/' className={styles.user}>
                <img src={profile.user.avatar} alt='avatar' className={styles.avatar} />
                <p className={styles.userName}>
                  {profile.user.firstName} {profile.user.lastName}
                </p>
              </Link>
              <LogoutButton onClick={logout} />
            </div>
            <ul className={styles.menuOptions}>
              <li className={styles.menuOption}>
                <Link to='/profile' className={styles.menuLink}>
                  <img src={ProfileIcon} alt='' className={styles.menuLinkIcon} />
                  <p className={styles.menuLinkText}>{t('Profile')}</p>
                </Link>
              </li>
              {profile.user.role === 'ADMIN' ? (
                <li className={styles.menuOption}>
                  <Link to='/admin' className={styles.menuLink}>
                    <img src={AdminPanelIcon} alt='' className={styles.menuLinkIcon} />
                    <p className={styles.menuLinkText}>{t('Admin panel')}</p>
                  </Link>
                </li>
              ) : profile.user.role === 'GUIDE' ? (
                <li className={styles.menuOption}>
                  <Link to='/offers/create' className={styles.menuLink}>
                    <img src={CreateOfferIcon} alt='' className={styles.menuLinkIcon} />
                    <p className={styles.menuLinkText}>{t('Create new offer')}</p>
                  </Link>
                  <Link to='/profile/guide' className={styles.menuLink}>
                    <img src={CreateOfferIcon} alt='' className={styles.menuLinkIcon} />
                    <p className={styles.menuLinkText}>{t('Manage your offers')}</p>
                  </Link>
                </li>
              ) : (
                <li className={styles.menuOption}>
                  <Link to='/register/guide' className={styles.menuLink}>
                    <img src={BecomeGuideIcon} alt='' className={styles.menuLinkIcon} />
                    <p className={styles.menuLinkText}>{t('Become a guide')}</p>
                  </Link>
                </li>
              )}
            </ul>
          </ul>
        )}
        <div className={styles.languageOptions}>
          <SwitchLanguageButton code='pl' />
          {` / `}
          <SwitchLanguageButton code='en' />
        </div>
      </div>
    </header>
  );
};

export default Header;
