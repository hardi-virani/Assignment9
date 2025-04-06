// src/store/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/apiConfig';

// Safe function to get user from localStorage
const getUserFromStorage = () => {
  try {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error('Error parsing user from localStorage:', error);
    return null;
  }
};

// Safe function to save user to localStorage
const saveUserToStorage = (user) => {
  try {
    if (user && typeof user === 'object') {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      console.error('Invalid user data, not saving to localStorage:', user);
    }
  } catch (error) {
    console.error('Error saving user to localStorage:', error);
  }
};

// Login thunk
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      console.log('Attempting login with:', { email, password });
      
      const response = await axios.post(API_ENDPOINTS.LOGIN, {
        email,
        password,
      });
      
      console.log('Login response:', response.data);
      
      if (response.data.success) {
        // Make sure we have a user object in the response
        if (!response.data.user) {
          console.error('Login response missing user data');
          return rejectWithValue('Login successful but user data is missing');
        }
        
        // Double check that the user object has the expected properties
        const user = response.data.user;
        console.log('Retrieved user data:', user);
        
        if (!user.email || !user.type) {
          console.error('User object is missing required fields:', user);
          return rejectWithValue('User data is incomplete');
        }
        
        console.log('User type from server:', user.type);
        
        // Save to localStorage and return
        saveUserToStorage(user);
        return user;
      } else {
        return rejectWithValue(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'Login failed. Please check your credentials and try again.'
      );
    }
  }
);

// Logout thunk
export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('user');
  return null;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: getUserFromStorage(),
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        // Added a log here to confirm user is set in state
        console.log('User set in auth state:', action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
        console.error('Login rejected:', action.payload);
      })
      // Logout cases
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;