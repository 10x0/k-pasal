import { message } from 'antd';
import http from './useAxios';

const getAll = () =>
  http
    .get('/user/all', {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('__session__'))?.token
        }`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      message.error(
        error.response?.data?.message ??
          error.message ??
          'Internal server error.'
      );
      return error;
    });

const create = (values) =>
  http
    .post(`/user`, values, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('__session__'))?.token
        }`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      message.error(
        error.response?.data?.message ??
          error.message ??
          'Internal server error.'
      );
      return error;
    });

const update = (id, values) =>
  http
    .put(`/user/${id}`, values, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('__session__'))?.token
        }`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      message.error(
        error.response?.data?.message ??
          error.message ??
          'Internal server error.'
      );
      return error;
    });

const remove = (id) =>
  http
    .delete(`/user/${id}`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('__session__'))?.token
        }`,
      },
    })
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
  getAll,
  create,
  update,
  remove,
};
