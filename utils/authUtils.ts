// utils/authUtils.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthUtils = {
  // Store authentication data
  storeAuth: async (token: string, userData: any) => {
    try {
      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      console.log('✅ Auth data stored');
    } catch (error) {
      console.error('Error storing auth data:', error);
      throw error;
    }
  },

  // Get authentication token
  getToken: async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem('authToken');
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  },

  // Get user data
  getUserData: async (): Promise<any | null> => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      return userDataString ? JSON.parse(userDataString) : null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  },

  // Check if user is authenticated
  isAuthenticated: async (): Promise<boolean> => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const userData = await AsyncStorage.getItem('userData');
      return !!(token && userData);
    } catch (error) {
      console.error('Error checking auth status:', error);
      return false;
    }
  },

  // Clear authentication data (logout)
  clearAuth: async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('userData');
      console.log('✅ Auth data cleared');
    } catch (error) {
      console.error('Error clearing auth data:', error);
      throw error;
    }
  },

  // Get auth header for API requests
  getAuthHeader: async (): Promise<{ Authorization: string } | {}> => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        return { Authorization: `Bearer ${token}` };
      }
      return {};
    } catch (error) {
      console.error('Error getting auth header:', error);
      return {};
    }
  },
};