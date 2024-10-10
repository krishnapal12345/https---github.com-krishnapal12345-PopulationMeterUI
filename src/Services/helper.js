import axios from 'axios';

export const myAxios = axios.create({
  baseURL: 'http://localhost:8080', // Ensure this matches your backend URL
  withCredentials: true, // This is necessary if you are handling sessions or cookies
});
