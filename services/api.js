// services/api.js - Frontend API Service
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configure your API base URL
const API_BASE_URL = __DEV__ 
  ? 'http://localhost:9000/api' 
  : 'https://your-production-api.com/api';

// Helper function to get auth token
const getAuthToken = async () => {
  try {
    return await AsyncStorage.getItem('authToken');
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

// Helper function to save auth token
export const saveAuthToken = async (token) => {
  try {
    await AsyncStorage.setItem('authToken', token);
  } catch (error) {
    console.error('Error saving auth token:', error);
  }
};

// Helper function to remove auth token
export const removeAuthToken = async () => {
  try {
    await AsyncStorage.removeItem('authToken');
  } catch (error) {
    console.error('Error removing auth token:', error);
  }
};

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  try {
    const token = await getAuthToken();
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Add authorization header if token exists
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        message: data.message || 'Something went wrong',
        errors: data.errors || [],
      };
    }

    return data;
  } catch (error) {
    if (error.status) {
      throw error;
    }
    throw {
      status: 0,
      message: 'Network error. Please check your connection.',
      errors: [],
    };
  }
};

// Auth API functions
export const authAPI = {
  // Register company and admin
  register: async (formData) => {
    const data = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    
    // Save token after successful registration
    if (data.success && data.data.token) {
      await saveAuthToken(data.data.token);
    }
    
    return data;
  },

  // Login admin
  login: async (adminEmail, password) => {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ adminEmail, password }),
    });
    
    // Save token after successful login
    if (data.success && data.data.token) {
      await saveAuthToken(data.data.token);
    }
    
    return data;
  },

  // Get current user profile
  getProfile: async () => {
    return await apiRequest('/auth/me', {
      method: 'GET',
    });
  },

  // Logout
  logout: async () => {
    await removeAuthToken();
  },
};

// Export API base URL for direct usage if needed
export { API_BASE_URL };