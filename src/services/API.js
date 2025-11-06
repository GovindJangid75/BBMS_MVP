import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_BASEURL || 'https://blood-bank-management-system-qxy1.onrender.com/api',
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

export default API;
