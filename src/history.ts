import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

export const forwardTo = (location: string) => {
  history.push(location);
};

export const refresh = (location: string) => {
  history.push('/');
  forwardTo(location);
};

export default history;
