import Toast from 'Utils/Toast';
import store from 'redux/store';
import { loginFail } from 'redux/actions';

export const handleError = <E>(error: E | any): E => {
  if (!error.response) {
    //NOTE:this will also happen if server request fails
    // error.toJSON()
    Toast({
      msg: 'Connection timeout. Please Refresh',
      type: 'error',
      notify: true,
    });
    return error;
  }

  if (error.response.status === 403) {
    Toast({
      msg: error.response.data,
      type: 'error',
      notify: true,
    });
    return error;
  }

  if (error.response.status === 401) {
    store.dispatch(loginFail());
    return error;
  }

  if (error.response.data?.message) {
    Toast({
      msg: error.response.data?.message,
      type: 'error',
      notify: true,
    });
    return error;
  }
  return error;
};
