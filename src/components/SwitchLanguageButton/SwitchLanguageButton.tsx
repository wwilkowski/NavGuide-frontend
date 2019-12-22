import React from 'react';
import { useTranslation } from 'react-i18next';
import { SwitchLanguageButtonProps } from './types';

const SwitchLanguageButton = ({ code }: SwitchLanguageButtonProps) => {
  const { i18n } = useTranslation();
  return (
    <button
      className='button'
      onClick={() => {
        i18n.changeLanguage(code);
        localStorage.setItem('appLanguage', code);
      }}
    >
      {code}
    </button>
  );
};

export default SwitchLanguageButton;
