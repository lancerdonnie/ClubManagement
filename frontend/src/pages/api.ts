import axios from 'axios';

const mutate = async (url: string, data?: any, method?: 'put' | 'delete') =>
  (
    await axios({
      url,
      method: method || 'post',
      data,
    })
  ).data;

export default mutate;
