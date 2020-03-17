import React from 'react';
import { useTranslation } from 'react-i18next';

export const NotFound = () => {
  const { t } = useTranslation();
  return <p data-testid='content'>{t('Not found')}</p>;
};
