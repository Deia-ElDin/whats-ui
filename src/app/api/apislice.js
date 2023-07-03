import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, clearAccessToken } from '../slices/authSlice';
import { cleareUserData } from '../slices/userSlice';
import { signOut } from 'firebase/auth';

export const BASE_URL = 'http://localhost:5500/';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const accessToken = getState().auth.accessToken;
    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    const refreshResult = await baseQuery('auth/refresh', api, extraOptions);
    if (refreshResult?.data) {
      api.dispatch(setCredentials({ ...refreshResult.data }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(cleareUserData());
      api.dispatch(clearAccessToken());
      signOut();
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Messages'],
  endpoints: () => ({}),
});
