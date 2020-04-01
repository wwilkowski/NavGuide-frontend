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
import AppLogo from '../../components/AppLogo/AppLogo';
import MenuIcon from '@material-ui/icons/Menu';
import styles from './Header.module.scss';
import { Avatar, Typography } from '@material-ui/core';

import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import FaceIcon from '@material-ui/icons/Face';
import EditIcon from '@material-ui/icons/Edit';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AddIcon from '@material-ui/icons/Add';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import { getToken } from '../../helpers/tokenCookie';

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);

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

  console.log(getToken());

  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.menuActions}>
        <AppLogo />
        <button onClick={() => setOpenMenu(!openMenu)} className={styles.menuToggler}>
          <MenuIcon />
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
                <Avatar src={profile.user.avatar} alt='user avatar' />
                <Typography className={styles.userName}>
                  {profile.user.firstName} {profile.user.lastName}
                </Typography>
              </Link>
              <LogoutButton onClick={logout} />
            </div>
            <ul className={styles.menuOptions}>
              <li className={styles.menuOption}>
                <Link to='/profile' className={styles.menuLink}>
                  <StyledMenuItem>
                    <ListItemIcon>
                      <FaceIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary={t('Profile')} />
                  </StyledMenuItem>
                </Link>
              </li>
              <li className={styles.menuOption}>
                <Link to='/profile/edit' className={styles.menuLink}>
                  <StyledMenuItem>
                    <ListItemIcon>
                      <EditIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary={t('Edit profile')} />
                  </StyledMenuItem>
                </Link>
              </li>
              {profile.user.role === 'ADMIN' ? (
                <li className={styles.menuOption}>
                  <Link to='/admin' className={styles.menuLink}>
                    <StyledMenuItem>
                      <ListItemIcon>
                        <SupervisorAccountIcon fontSize='small' />
                      </ListItemIcon>
                      <ListItemText primary={t('Admin panel')} />
                    </StyledMenuItem>
                  </Link>
                </li>
              ) : profile.user.role === 'GUIDE' ? (
                <li className={styles.menuOption}>
                  <Link to='/offers/create' className={styles.menuLink}>
                    <StyledMenuItem>
                      <ListItemIcon>
                        <AddIcon fontSize='small' />
                      </ListItemIcon>
                      <ListItemText primary={t('Create new offer')} />
                    </StyledMenuItem>
                  </Link>
                  <Link to='/profile/guide' className={styles.menuLink}>
                    <StyledMenuItem>
                      <ListItemIcon>
                        <ListAltIcon fontSize='small' />
                      </ListItemIcon>
                      <ListItemText primary={t('Manage your offers')} />
                    </StyledMenuItem>
                  </Link>
                </li>
              ) : (
                <li className={styles.menuOption}>
                  <Link to='/register/guide' className={styles.menuLink}>
                    <StyledMenuItem>
                      <ListItemIcon>
                        <AccessibilityNewIcon fontSize='small' />
                      </ListItemIcon>
                      <ListItemText primary={t('Become a guide')} />
                    </StyledMenuItem>
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
