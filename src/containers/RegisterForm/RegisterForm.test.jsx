import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent } from '@testing-library/react';
import RegisterForm from './RegisterForm';
import EditRegistrationForm from '../../components/EditRegistrationForm/EditRegistrationForm';
import i18n from '../../locales/i18n';
import { Provider } from 'react-redux';
import { configureStore } from '../../store';

const store = configureStore();

function renderWithRouter(ui, { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {}) {
  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>{ui}</Router>)
      </Provider>
    ),
    history
  };
}
// czy wyświetla RegisterPage na ścieżce "/"
it('wyświetla RegisterPage na ścieżce /register', () => {
  const { getByTestId } = renderWithRouter(<RegisterForm />, { route: '/register' });
  expect(getByTestId('content').textContent).toBe('RegisterPage');
});

// czy wyświetla NextRegistrationStep na ścieżce "/register/edit"
it('wyświetla formularz edycji rejestracji na ścieżce /register/edit', () => {
  const { getByTestId } = renderWithRouter(<RegisterForm />, { route: '/register/edit' });
  expect(getByTestId('RegisterEditForm').textContent).toBeTruthy();
});

// czy wyświetla NotFoundPage na nieznanej ścieżce
it('wyświetla NotFound na ścieżce nieznanej', () => {
  const { getByTestId } = renderWithRouter(<RegisterForm />, { route: '/register/abcd' });
  expect(getByTestId('content').textContent).toBe('NotFoundPage');
});
