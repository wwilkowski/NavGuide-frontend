import React from 'react';
import { useTranslation } from 'react-i18next';
import { IProps } from './types';
import Button from '@material-ui/core/Button';

const LogoutButton = ({ onClick }: IProps) => {
  const { t } = useTranslation();
  return (
    <Button onClick={onClick} color='secondary' style={{ fontSize: '0.7rem' }}>
      {t('Logout')}
    </Button>
  );
};

export default LogoutButton;
