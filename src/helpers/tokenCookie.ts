import Cookies from "js-cookie";

export const tokenCookieName = "authToken";

export const initTokenCookie = (token: string) =>
  Cookies.set(tokenCookieName, token);

export const ifTokenExists = () => Cookies.get(tokenCookieName) !== undefined;

export const getToken = () => Cookies.get(tokenCookieName);

export const setToken = (token: string) => Cookies.set(tokenCookieName, token);
