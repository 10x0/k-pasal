import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:5001/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

http.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const session = JSON.parse(localStorage.getItem('_session_') ?? '{}');
    if (session?.token) {
      config.headers = {
        authorization: `Bearer ${session.token}`,
      };
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
http.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default http;
