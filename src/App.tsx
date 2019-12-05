import React from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';
import SwitchLanguageButton from './components/SwitchLanguageButton';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Example1 from './containers/Example1/Example1';
import Example2 from './containers/Example2/Example2';

const App: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Router>
      <Link to='/'>Home</Link>
      <Link to='/register'>Register</Link>
      <Switch>
        <Route path='/register'>
          <p> Register</p>
        </Route>
        <Route path='/'>
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
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
