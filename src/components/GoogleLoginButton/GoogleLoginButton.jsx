import React from 'react';
import GoogleLogin from 'react-google-login';
import { useTranslation } from 'react-i18next';

const GoogleLoginButton = ({ signInWithUserCode }) => {
  const responseGoogle = response => {
    signInWithUserCode(response.code);
  };
  const { t } = useTranslation();
  return (
    <GoogleLogin
      clientId='1095850462503-47vu62eqij6r2r8k1ucugo34gdc5dide.apps.googleusercontent.com'
      buttonText={t('Log in with Google')}
      accessType='offline'
      responseType='code'
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleLoginButton;
