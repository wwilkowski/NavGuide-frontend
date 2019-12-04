import { ADD_USER, FETCH_USERS_FAILED, FETCH_USERS_REQUESTED, FETCH_USERS_SUCCESSED } from './constants';

export interface addUserAction {
  type: typeof ADD_USER;
  username: string;
}

export interface UserType {
  username: string;
}

export interface UserState {
  users: UserType[];
}

export interface fetchUsersAction {
  type: typeof FETCH_USERS_REQUESTED;
}

export interface fetchUsersSuccessedAction {
  type: typeof FETCH_USERS_SUCCESSED;
  users: UserType[];
}

export interface fetchUsersFailedAction {
  type: typeof FETCH_USERS_FAILED;
  message: string;
}

export type usersActionType = addUserAction | fetchUsersSuccessedAction;
