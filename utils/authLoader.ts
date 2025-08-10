import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppDispatch } from '../app/store';
import { AuthResponsePayload, logout, setCredentials } from '../features/auth/authSlice';

export const persistUser = (user: AuthResponsePayload) => async (dispatch: AppDispatch) => {
  try {
    await AsyncStorage.setItem('userInfo', JSON.stringify(user));
    dispatch(setCredentials(user));
  } catch (error) {
    console.error('Failed to persist user info:', error);
  }
};


export const clearUser = () => async (dispatch: AppDispatch) => {
  try {
    await AsyncStorage.removeItem('userInfo');
    dispatch(logout());
  } catch (error) {
    console.error('Failed to clear user from storage:', error);
  }
};

export const loadUserFromStorage = () => async (dispatch: AppDispatch) => {
  try {
    const stored = await AsyncStorage.getItem('userInfo');
    if (stored) {
      const parsed: AuthResponsePayload = JSON.parse(stored);
      dispatch(setCredentials(parsed));
    }
  } catch (error) {
    console.error('Failed to load user from storage:', error);
  }
};
