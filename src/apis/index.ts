import axios from 'axios';

const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'https://port-0-server-p8xrq2mlfsc6kg2.sel3.cloudtype.app';

export const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

export const clientWithoutContentType = axios.create({
  baseURL: BASE_URL,
});

clientWithoutContentType.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);
