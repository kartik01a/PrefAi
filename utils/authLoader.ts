import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppDispatch } from '../app/store';
import { UserInfo, logout, setCredentials } from '../features/auth/authSlice';

export const persistUser = (user: UserInfo) => async (dispatch: AppDispatch) => {
  // try {
  //   await AsyncStorage.setItem('userInfo', JSON.stringify(user));
  //   dispatch(setCredentials(user));
  // } catch (error) {
  //   console.error('Failed to save user to storage:', error);
  // }
   try {
    await AsyncStorage.setItem('userInfo', JSON.stringify(user));
    dispatch(
      setCredentials({
        data: {
          accessToken: user.token,
          refreshToken: user.refreshToken || '',
          userInfo: {
            _id: user.id,
            email: user.email,
            role: user.role,
            provider: user.provider,
            active: user.active ?? true,
            firstName: user.firstName,
            lastName: user.lastName,
            passportNumber: user.passportNumber,
            facebookId: user.facebookId,
            linkedinId: user.linkedinId,
            image: user.image,
            userName: user.userName,
            securityNumber: user.securityNumber,
            title: user.title,
            country: user.country,
            maritalStatus: user.maritalStatus,
            dob: user.dob,
            arrivalDate: user.arrivalDate,
          },
        },
        success: true,
      })
    );
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

// export const loadUserFromStorage = () => async (dispatch: AppDispatch) => {
//   try {
//     const stored = await AsyncStorage.getItem('userInfo');
//     if (stored) {
//       dispatch(setCredentials(JSON.parse(stored)));
//     }
//   } catch (error) {
//     console.error('Failed to load user from storage:', error);
//   }
// };


export const loadUserFromStorage = () => async (dispatch: AppDispatch) => {
  try {
    const stored = await AsyncStorage.getItem('userInfo');
    if (stored) {
      const parsed: UserInfo = JSON.parse(stored);

      const authPayload = {
        data: {
          accessToken: parsed.token,
          refreshToken: parsed.refreshToken ?? '',
          userInfo: {
            _id: parsed.id,
            email: parsed.email,
            role: parsed.role,
            provider: parsed.provider,
            active: parsed.active ?? true,
            firstName: parsed.firstName,
            lastName: parsed.lastName,
            passportNumber: parsed.passportNumber,
            facebookId: parsed.facebookId,
            linkedinId: parsed.linkedinId,
            image: parsed.image,
            userName: parsed.userName,
            securityNumber: parsed.securityNumber,
            title: parsed.title,
            country: parsed.country,
            maritalStatus: parsed.maritalStatus,
            dob: parsed.dob,
            arrivalDate: parsed.arrivalDate,
          },
        },
        success: true,
      };

      dispatch(setCredentials(authPayload));
    }
  } catch (error) {
    console.error('Failed to load user from storage:', error);
  }
};