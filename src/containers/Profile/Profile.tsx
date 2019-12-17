import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './actions';
import { StoreType } from '../../store';
import { Redirect } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { useTranslation } from 'react-i18next';

const Profile = () => {
  const dispatcher = useDispatch();
  const { t } = useTranslation();

  const firstName = useSelector((state: StoreType) => state.profile.firstName);
  const loggedIn = useSelector((state: StoreType) => state.login.isLoggedIn);

  useEffect(() => {
    dispatcher(actions.templateRequest());
  }, [dispatcher]);

  useEffect(() => {
    if (!loggedIn) {
      NotificationManager.warning(t('You are not logged in!'), t('Warning'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {!loggedIn && <Redirect to='/' />}
      <h1>{t('Profile')}</h1>
      <p>
        {t('Hello')} {firstName}. {t("You're logged in!")}
      </p>
    </div>
  );
};

export default Profile;
