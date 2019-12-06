import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

function renderWithRouter(ui, { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {}) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history
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

// czy po kliknięciu w link Home przenosi na /
it('Przenosi na ścieżkę "/" po kliknięciu w link Home', () => {
  const history = createMemoryHistory();
  const { getByTestId } = render(
    <Router history={history}>
      <App />
    </Router>
  );
  fireEvent.click(getByTestId('homeLink'));
  expect(getByTestId('content').textContent).toBe('HomePage');
});

// czy po kliknięciu w link Register przenosi na /register
it('Przenosi na ścieżkę "/register" po kliknięciu w link Register', () => {
  const history = createMemoryHistory();
  const { getByTestId } = render(
    <Router history={history}>
      <App />
    </Router>
  );
  fireEvent.click(getByTestId('registerLink'));
  expect(getByTestId('content').textContent).toBe('RegisterPage');
});
