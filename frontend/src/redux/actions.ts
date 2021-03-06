import type { LoginSuccess } from 'types';
import { queryClient } from 'Utils/util';

export const loginSuccess = ({ data: { token, username } }: LoginSuccess) => {
  localStorage.setItem('token', token);
  localStorage.setItem('authenticated', 'true');
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
  queryClient.clear();
  return { type: 'AUTHFALSE' };
};

export const logout = () => {
  return loginFail();
};
