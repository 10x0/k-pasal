import { message } from 'antd';
import http from './useAxios';

const register = (details) =>
  http
    .post('/auth/register', details)
    .then((response) => response.data)
    .catch((error) => {
      message.error(
        error.response?.data?.message ??
          error.message ??
          'Internal server error.'
      );
      return error;
    });

const login = (details) =>
  http
    .post('/auth/login', details)
    .then((response) => response.data)
    .catch((error) => {
      message.error(
        error.response?.data?.message ??
          error.message ??
          'Internal server error.'
      );
      return error;
    });

export default {
  register,
  login,
};
