import Cookies from 'js-cookie';

export const authTokenName = 'authToken';

export const initTokenCookie = (token: string) => Cookies.set(authTokenName, token);

export const ifTokenExists = () => Cookies.get(authTokenName) !== undefined;

export const getToken = () => Cookies.get(authTokenName);

export const setToken = (token: string) => Cookies.set(authTokenName, token);
