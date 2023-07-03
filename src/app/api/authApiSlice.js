import { apiSlice } from './apislice';
import { clearAccessToken } from '../slices/authSlice';
import { cleareUserData } from '../slices/userSlice';

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (credentials) => ({
        url: 'auth/signin',
        method: 'POST',
        body: credentials,
      }),
    }),

    refresh: builder.mutation({
      query: () => ({
        url: 'auth/refresh',
        method: 'Get',
      }),
    }),

    sendLogout: builder.mutation({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(cleareUserData());
          dispatch(clearAccessToken());
          dispatch(apiSlice.util.resetApiState());
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const { useSignInMutation, useRefreshMutation, useSendLogoutMutation } =
  authApiSlice;
