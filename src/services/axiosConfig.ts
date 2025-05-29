import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// API base URL
const API_BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000/';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: import('axios').InternalAxiosRequestConfig): import('axios').InternalAxiosRequestConfig => {
    const token = localStorage.getItem('accessToken');
    
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
      config.headers['x-access-token'] = token;
      
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        config.headers['x-refresh-token'] = refreshToken;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      // Handle 401 Unauthorized errors
      localStorage.removeItem('token');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      // You can add redirect logic here if needed
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;