import { baseApiUrl, checkResponse } from './burger-api';
import { getCookie } from './cookie';

const authApiUrl = 'https://norma.nomoreparties.space/api/auth';

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  return fetch(`${authApiUrl}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({ email, password, name }),
  }).then(checkResponse);
};

export const login = async (email: string, password: string) => {
  return fetch(`${authApiUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: getCookie('accessToken') || '',
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

export const logout = async () => {
  return fetch(`${authApiUrl}/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ token: getCookie('refreshToken') }),
  }).then(checkResponse);
};

export const getProfile = () => {
  return fetch(`${authApiUrl}/user`, {
    method: 'GET',
    headers: {
      Authorization: getCookie('accessToken') || '',
    },
  }).then(checkResponse);
};

export const updateProfile = async (name: string, email: string) => {
  return fetch(`${authApiUrl}/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: getCookie('accessToken') || '',
    },
    body: JSON.stringify({ name, email }),
  }).then(checkResponse);
};

export const refreshToken = async () => {
  return fetch(`${authApiUrl}/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ token: getCookie('refreshToken') }),
  }).then(checkResponse);
};

export const passwordReset = async (email: string) => {
  return fetch(`${baseApiUrl}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ email }),
  }).then(checkResponse);
};

export const passwordResetWithCode = async (password: string, code: string) => {
  return fetch(`${baseApiUrl}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ password, token: code }),
  }).then(checkResponse);
};
