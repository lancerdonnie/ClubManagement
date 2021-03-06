import type { LoginSuccess } from 'types';
import { queryClient } from 'Utils/util';

export const loginSuccess = ({ data: { token, username } }: LoginSuccess) => {
  localStorage.setItem('token', token);
  localStorage.setItem('authenticated', 'true');
  localStorage.setItem('username', username);
  return {
    type: 'AUTHTRUE',
    payload: {
      token,
      username,
    },
  };
};

export const loginFail = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('authenticated');
  localStorage.removeItem('username');
  queryClient.clear();
  return { type: 'AUTHFALSE' };
};

export const logout = () => {
  return loginFail();
};
