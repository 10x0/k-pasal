import { message } from 'antd';
import http from './useAxios';

const create = (details) =>
  http
    .post(`/order`, details, {
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

const getAll = () =>
  http
    .get(`/order/all/`, {
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

const update = (id, status) =>
  http
    .put(
      `/order/${id}`,
      { status: status },
      {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('__session__'))?.token
          }`,
        },
      }
    )
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
};
