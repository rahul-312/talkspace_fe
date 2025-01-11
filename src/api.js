import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/users/', // Replace with your API base URL
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`, // Add token if needed
  },
});

export default axiosInstance;