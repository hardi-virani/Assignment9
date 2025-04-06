// src/services/authService.js
import apiClient from './apiService';
import { API_ENDPOINTS } from '../config/apiConfig';

/**
 * Authentication service for handling user auth operations
 */
const authService = {
  /**
   * Login a user with email and password
   * @param {Object} credentials - The user credentials
   * @param {string} credentials.email - User email
   * @param {string} credentials.password - User password
   * @returns {Promise} - Promise with user data or error
   */
  login: async (credentials) => {
    const response = await apiClient.post(API_ENDPOINTS.LOGIN, credentials);
    return response.data;
  },

  /**
   * Register a new user
   * @param {Object} userData - The user data
   * @returns {Promise} - Promise with success message or error
   */
  register: async (userData) => {
    const response = await apiClient.post(API_ENDPOINTS.REGISTER, userData);
    return response.data;
  },

  /**
   * Get the currently logged in user from localStorage
   * @returns {Object|null} - The user object or null if not logged in
   */
  getCurrentUser: () => {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error getting user from localStorage:', error);
      return null;
    }
  },

  /**
   * Save user data to localStorage
   * @param {Object} user - The user data to save
   */
  saveUser: (user) => {
    try {
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user to localStorage:', error);
    }
  },

  /**
   * Remove user data from localStorage
   */
  logout: () => {
    localStorage.removeItem('user');
  }
};

export default authService;