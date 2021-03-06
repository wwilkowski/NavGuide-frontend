import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent } from '@testing-library/react';
import App from './App';
import i18n from './locales/i18n';
import { Provider } from 'react-redux';
import { configureStore } from './store';

const store = configureStore();

function renderWithRouter(ui, { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {}) {
  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>{ui}</Router>)
      </Provider>,
      history
    )
  };
}

// czy wyświetla HomePage na ścieżce "/"
it('wyświetla HomePage na ścieżce "/"', () => {
  const { getByTestId } = renderWithRouter(<App />, { route: '/' });
  expect(getByTestId('content').textContent).toBe('HomePage');
});

// czy wyświetla RegisterPage na ścieżce "/"
it('wyświetla RegisterPage na ścieżce /register', () => {
  const { getByTestId } = renderWithRouter(<App />, { route: '/register' });
  expect(getByTestId('content').textContent).toBe('RegisterPage');
});

// czy wyświetla NotFoundPage na nieznanej ścieżce
it('wyświetla NotFound na ścieżce nieznanej', () => {
  const { getByTestId } = renderWithRouter(<App />, { route: '/something' });
  expect(getByTestId('content').textContent).toBe('NotFoundPage');
});
