// src/utils/auth.js
const TOKEN_KEY = 'accessToken';

export const saveToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const isLoggedIn = () => !!getToken();
export const logout = () => localStorage.removeItem(TOKEN_KEY);
