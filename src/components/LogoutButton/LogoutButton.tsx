import React from 'react';
import { useTranslation } from 'react-i18next';

interface IProps {
  onClick: () => void;
}

const LogoutButton = ({ onClick }: IProps) => {
  const { t } = useTranslation();
  return <button onClick={onClick}>{t('Logout')}</button>;
};

export default LogoutButton;
