// src/store/slices/jobSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/apiConfig';

// Fetch all jobs
export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Fetching jobs from API...');
      const response = await axios.get(API_ENDPOINTS.GET_ALL_JOBS);
      
      console.log('Jobs API response:', response.data);
      
      if (response.data.success) {
        return response.data.jobs || [];
      } else {
        return rejectWithValue(response.data.message || 'Error fetching jobs');
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch jobs');
    }
  }
);

// Create job (admin only)
export const createJob = createAsyncThunk(
  'jobs/createJob',
  async (jobData, { rejectWithValue, getState }) => {
    try {
      // Get admin email from state
      const { auth } = getState();
      
      console.log('Auth state when creating job:', auth);
      
      if (!auth.user || !auth.user.email) {
        console.error('No user or email in auth state');
        return rejectWithValue('Not authenticated or missing user info');
      }
      
      if (auth.user.type !== 'admin') {
        console.error('User is not an admin, type:', auth.user.type);
        return rejectWithValue('Only admins can create jobs');
      }
      
      const adminEmail = auth.user.email;
      console.log('Creating job with admin email:', adminEmail);

      // Add admin email to job data
      const jobWithAdmin = { ...jobData, email: adminEmail };
      console.log('Complete job data being sent:', jobWithAdmin);

      const response = await axios.post(API_ENDPOINTS.CREATE_JOB, jobWithAdmin);
      
      console.log('Job creation response:', response.data);
      
      if (response.data.success) {
        // Fetch updated job list after successful creation
        return response.data;
      } else {
        console.error('Job creation failed:', response.data);
        return rejectWithValue(response.data.message || 'Error creating job');
      }
    } catch (error) {
      console.error('Job creation exception:', error);
      console.error('Error details:', error.toJSON());


      console.error('Job creation exception:', error);
      console.error('Error response:', error.response?.data);
      
      // Try to extract the most meaningful error message
      const errorMessage = 
      error.response?.data?.error || 
      error.response?.data?.message || 
      error.message || 
      'Failed to create job';
      
      return rejectWithValue(errorMessage);
    }
  }
);

const jobSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobs: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearJobError: (state) => {
      state.error = null;
    },
    clearJobSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch jobs cases
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create job cases
      .addCase(createJob.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createJob.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { clearJobError, clearJobSuccess } = jobSlice.actions;
export default jobSlice.reducer;