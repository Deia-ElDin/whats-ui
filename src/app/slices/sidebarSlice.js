import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchInputValue: '',
  displayChatRooms: true,
  searchResult: {
    server: [],
    contacts: [],
    chats: [],
    messages: [],
  },
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setSearchInputValue: (state, action) => {
      state.searchInputValue = action.payload;
    },
    setDisplayChatRooms: (state, action) => {
      state.displayChatRooms = action.payload;
    },
    setSearchResult: (state, action) => {
      state.searchResult = {
        server: action.payload?.server ?? [],
        contacts: action.payload?.contacts ?? [],
        chats: action.payload?.chats ?? [],
        messages: action.payload?.messages ?? [],
      };
    },
  },
});

const sidebarReducer = sidebarSlice.reducer;

export const selectSearchInputValue = (state) => state.sidebar.searchInputValue;
export const selectDisplayChatRooms = (state) => state.sidebar.displayChatRooms;
export const selectSearchResult = (state) => state.sidebar.searchResult;

export const { setSearchInputValue, setDisplayChatRooms, setSearchResult } =
  sidebarSlice.actions;

export default sidebarReducer;
