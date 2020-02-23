import axios from 'axios';

const api = axios.create({
  baseURL: 'http://159.89.187.55/',
});
// baseURL: 'http://192.168.1.45:3333/',

export default api;
