import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Auto attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('pricepulse_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('pricepulse_token');
      localStorage.removeItem('pricepulse_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
