import { message } from 'antd';
import http from './useAxios';

const getAll = () =>
  http
    .get(`/product/all/`)
    .then((response) => response.data)
    .catch((error) => {
      message.error(
        error.response?.data?.message ??
          error.message ??
          'Internal server error.'
      );
      return error;
    });

const search = (key) =>
  http
    .get(`/product/all/?keyword=${key}`)
    .then((response) => response.data)
    .catch((error) => {
      message.error(
        error.response?.data?.message ??
          error.message ??
          'Internal server error.'
      );
      return error;
    });

const getSingle = (id) =>
  http
    .get(`/product/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      message.error(
        error.response?.data?.message ??
          error.message ??
          'Internal server error.'
      );
      return error;
    });

const getCategory = (category) =>
  http
    .get(`/product/all/?${category === '' ? '' : `category=${category}`}`)
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
    .post('/product', values, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('__session__'))?.token
        }`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      message.error(
        error?.response?.data?.message ??
          error.message ??
          'Internal server error.'
      );
      return error;
    });
const update = (id, values) =>
  http
    .put(`/product/${id}`, values, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('__session__'))?.token
        }`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      message.error(
        error?.response?.data?.message ??
          error.message ??
          'Internal server error.'
      );
      return error;
    });

const remove = (id) =>
  http
    .delete(`/product/${id}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('__session__'))?.token
        }`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      message.error(
        error?.response?.data?.message ??
          error.message ??
          'Internal server error.'
      );
      return error;
    });

export default {
  search,
  getAll,
  getSingle,
  getCategory,
  create,
  update,
  remove,
};
