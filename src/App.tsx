import React from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';
import SwitchLanguageButton from './components/SwitchLanguageButton';
import Example1 from './containers/Example1/Example1';
import Example2 from './containers/Example2/Example2';

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
      <Example1 />
      <Example2 />
    </>
  );
};

export default App;
