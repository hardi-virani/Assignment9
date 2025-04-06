// src/services/apiService.js
import axios from 'axios';

// Create an instance of axios with default config
const apiClient = axios.create({
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors like network issues or server errors
    if (!error.response) {
      console.error('Network Error:', error);
      return Promise.reject({ message: 'Network error. Please check your internet connection.' });
    }

    // Handle different HTTP error codes
    switch (error.response.status) {
      case 401:
        // Handle unauthorized error
        // Could redirect to login page or dispatch a logout action
        console.error('Unauthorized access', error.response.data);
        break;
      case 404:
        console.error('Resource not found', error.response.data);
        break;
      case 500:
        console.error('Server error', error.response.data);
        break;
      default:
        console.error('API Error:', error.response.data);
    }

    return Promise.reject(error);
  }
);

export default apiClient;