import React from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';
import SwitchLanguageButton from './components/SwitchLanguageButton';

const App: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <h1>{t('Hello, world!')}</h1>
      <ul>
        <li>
          <SwitchLanguageButton code={'pl'} />
        </li>
        <li>
          <SwitchLanguageButton code={'en'} />
        </li>
      </ul>
    </>
  );
};

export default App;
