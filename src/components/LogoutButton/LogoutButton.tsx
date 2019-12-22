import React from 'react';
import { useTranslation } from 'react-i18next';
import { IProps } from './types';

const LogoutButton = ({ onClick }: IProps) => {
  const { t } = useTranslation();
  return (
    <button className='button is-danger' onClick={onClick}>
      {t('Logout')}
    </button>
  );
};

export default LogoutButton;
