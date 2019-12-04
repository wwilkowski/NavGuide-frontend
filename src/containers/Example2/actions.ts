import { ADD_USER, FETCH_USERS_REQUESTED } from './constants';

export const addUser = (username: string) => ({
  type: ADD_USER,
  username
});

export const fetchUsers = () => ({
  type: FETCH_USERS_REQUESTED
});
