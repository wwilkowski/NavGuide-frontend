import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

export const forwardTo = (location: string) => {
  history.push(location);
};

export default history;
