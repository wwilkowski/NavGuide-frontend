import React from 'react';
import GoogleLogin from 'react-google-login';
import { useTranslation } from 'react-i18next';

const GoogleLoginButton = ({ signUpUserWithCode }) => {
  const responseGoogle = response => {
    signUpUserWithCode(response.code);
  };
  const { t } = useTranslation();
  return (
    <GoogleLogin
      clientId='1095850462503-47vu62eqij6r2r8k1ucugo34gdc5dide.apps.googleusercontent.com'
      buttonText={t('Sign up with Google')}
      accessType='offline'
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleLoginButton;
