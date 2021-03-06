import axios from 'axios';
import Toast from 'Utils/Toast';
import store from 'redux/store';
import { QueryClient, QueryFunctionContext } from 'react-query';
import { url } from 'appConstants';
import { handleError } from './handleError';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }: QueryFunctionContext) => {
        const {
          data: { data },
        } = await axios.get(`${queryKey[0]}`);
        return data;
      },
      refetchOnWindowFocus: false,
      retry: (_: number, error: any): boolean => (!error.response ? true : false),
    },
  },
});

export const setup = () => {
  axios.defaults.baseURL = url;
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.interceptors.request.use(function (config) {
    const token = store.getState()?.token;
    config.headers.authorization = token ? `${token}` : '';
    return config;
  });
  axios.interceptors.response.use(
    (response) => {
      if (response.status === 200 && response.config.method !== 'get') {
        if (response.data.token) return response;
        if (response.data.status === true) {
          Toast({
            msg: response.data.detail,
            type: 'success',
            notify: response.data.detail === 'Success' ? false : true,
          });
        } else if (response.data.status === false) {
          Toast({
            msg: response.data.detail,
            type: 'warning',
            notify: true,
          });
        } else {
          if (response.data.detail) {
            Toast({ msg: response.data.detail, type: 'error', notify: true });
          }
        }
        return response;
      } else {
        return response;
      }
    },
    (error) => {
      return Promise.reject(handleError(error));
    }
  );
};
