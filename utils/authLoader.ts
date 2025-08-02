import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppDispatch } from '../app/store';
import { UserInfo, logout, setCredentials } from '../features/auth/authSlice';

// Save user to AsyncStorage
export const persistUser = (user: UserInfo) => async (dispatch: AppDispatch) => {
  try {
    await AsyncStorage.setItem('userInfo', JSON.stringify(user));
    dispatch(setCredentials(user));
  } catch (error) {
    console.error('Failed to save user to storage:', error);
  }
};

// Remove user from AsyncStorage
export const clearUser = () => async (dispatch: AppDispatch) => {
  try {
    await AsyncStorage.removeItem('userInfo');
    dispatch(logout());
  } catch (error) {
    console.error('Failed to clear user from storage:', error);
  }
};

// Load user from AsyncStorage
export const loadUserFromStorage = () => async (dispatch: AppDispatch) => {
  try {
    const stored = await AsyncStorage.getItem('userInfo');
    if (stored) {
      dispatch(setCredentials(JSON.parse(stored)));
    }
  } catch (error) {
    console.error('Failed to load user from storage:', error);
  }
};
