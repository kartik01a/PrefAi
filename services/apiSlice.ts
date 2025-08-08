// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { BASE_URL } from '../constants/constants';

// const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

// export const apiSlice = createApi({
//   baseQuery,
//   tagTypes: ['User', 'Subscription'],
//   endpoints: () => ({}),
// });

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants/constants';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: async (headers) => {
    try {
      const userInfo = await AsyncStorage.getItem('userInfo');
      if (userInfo) {
        const parsed = JSON.parse(userInfo);
        const token = parsed?.token || parsed?.data?.accessToken;

        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
      }
    } catch (error) {
      console.error('Failed to attach token:', error);
    }

    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User', 'Subscription'],
  endpoints: () => ({}),
});
