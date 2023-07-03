import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload;
      state.accessToken = accessToken;
    },
    clearAccessToken: (state) => {
      state.accessToken = '';
    },
  },
});

const authReducer = authSlice.reducer;

export const selectAccessToken = (state) => state.auth.accessToken;

export const { setCredentials, clearAccessToken } = authSlice.actions;

export default authReducer;
