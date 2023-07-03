import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInputRef: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUserInputRef: (state, action) => {
      state.userInputRef = action.payload;
    },
  },
});

const appReducer = appSlice.reducer;

export const selectUserInputRef = (state) => state.app.userInputRef;

// export const { setUserInputRef } = appSlice.actions;

export default appReducer;
