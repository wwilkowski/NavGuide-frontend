import React from 'react';
import { useTranslation } from 'react-i18next';
import { SwitchLanguageButtonProps } from './types';
import styles from './SwitchLanguageButton.module.scss';

const SwitchLanguageButton = ({ code }: SwitchLanguageButtonProps) => {
  const { i18n } = useTranslation();
  return (
    <button
      className={`${styles.button} ${localStorage.getItem('appLanguage') === code ? styles.enableLang : styles.disableLang}`}
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
