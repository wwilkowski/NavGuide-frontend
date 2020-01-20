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
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import styles from './Header.module.scss';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    paper: {
      marginRight: theme.spacing(2)
    },
    popper: {
      zIndex: 2000
    },
    link: {
      width: '100%',
      height: '100%'
    }
  })
);

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

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      if (anchorRef.current != null) anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <nav className='navbar' role='navigation' aria-label='main navigation' style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div className='navbar-brand'>
        <a className='navbar-item' href='/'>
          <h1 className={styles.logo}>NavGuide</h1>
        </a>
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        {!profile.isLoggedIn ? (
          <>
            <GoogleButton text='Sign up with Google' onSuccess={signUpWithUserCode} onFailure={signUpWithUserCode} />
            <GoogleButton text='Sign in with Google' onSuccess={signInWithUserCode} onFailure={signInWithUserCode} />
          </>
        ) : (
          <div className={classes.root}>
            <div>
              <Button ref={anchorRef} aria-controls={open ? 'menu-list-grow' : undefined} aria-haspopup='true' onClick={handleToggle}>
                <img src={profile.user.avatar} alt='avatar' className={styles.avatar} />
                <p>{profile.user.firstName}</p>
              </Button>
              <Popper open={open} className={classes.popper} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                  <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList autoFocusItem={open} id='menu-list-grow' onKeyDown={handleListKeyDown}>
                          <MenuItem onClick={handleClose}>
                            <Link to='/profile' className={classes.link}>
                              {t('Profile')}
                            </Link>
                          </MenuItem>
                          <MenuItem onClick={handleClose}>
                            <Link to='/profile/edit' className={classes.link}>
                              {t('Edit profile')}
                            </Link>
                          </MenuItem>
                          <MenuItem onClick={handleClose}>
                            <Link to='/register/guide' className={classes.link}>
                              {t('Become a guide')}
                            </Link>
                          </MenuItem>
                          <MenuItem onClick={handleClose}>
                            <LogoutButton onClick={logout} />
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          </div>
        )}
        <SwitchLanguageButton code='pl' />
        <SwitchLanguageButton code='en' />
      </div>
    </nav>
  );
};

export default Header;
