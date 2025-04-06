// src/config/apiConfig.js
const API_BASE_URL = 'http://localhost:8080';

export const API_ENDPOINTS = {
  // User endpoints
  LOGIN: `${API_BASE_URL}/user/login`,
  REGISTER: `${API_BASE_URL}/user/create`,
  GET_ALL_USERS: `${API_BASE_URL}/user/getAll`,
  UPDATE_USER: `${API_BASE_URL}/user/edit`,
  DELETE_USER: `${API_BASE_URL}/user/delete`,
  UPLOAD_IMAGE: `${API_BASE_URL}/user/uploadImage`,
  
  // Job endpoints
  CREATE_JOB: `${API_BASE_URL}/job/create`,
  GET_ALL_JOBS: `${API_BASE_URL}/job/getAll`,
  
  // Company images
  GET_COMPANY_IMAGES: `${API_BASE_URL}/company-images`,
};

export default API_ENDPOINTS;