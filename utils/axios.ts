import axios from 'axios';

export const axiosApi = axios.create({
  baseURL: '',
  timeout: 1000,
});
