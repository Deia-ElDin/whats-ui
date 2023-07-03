import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: {
    _id: '',
    username: '',
    email: '',
    phoneNumber: '',
    photoURL: '',
    contacts: [],
    rooms: [],
    currentRoom: '',
    socketId: '',
  },
  displayInfoSide: false,
  documents: [],
  firstMessageRef: false,
  firstMessageInView: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = {
        _id: action.payload._id ?? state.userData._id,
        username: action.payload.username ?? state.userData.username,
        email: action.payload.email ?? state.userData.email,
        phoneNumber: action.payload.phoneNumber ?? state.userData.phoneNumber,
        photoURL: action.payload.photoURL ?? state.userData.photoURL,
        contacts: action.payload.contacts ?? state.userData.contacts,
        rooms: action.payload.rooms ?? state.userData.rooms,
        currentRoom: action.payload.currentRoom ?? state.userData.currentRoom,
        socketId: action.payload.socketId ?? state.userData.socketId,
      };
    },
    addNewRoom: (state, action) => {
      console.log('addNewRoom userSlice');
      const newRoom = action.payload;
      const rooms = JSON.parse(JSON.stringify(state.userData.rooms));
      const existRoom = rooms.find((room) => room._id === newRoom._id);
      if (existRoom) return;
      state.userData.rooms.push(newRoom);
    },
    updateRoom: (state, action) => {
      console.log('updateRoom userSlice');
      const updatedRoom = action.payload;
      state.userData.rooms.map((room) => {
        if (room._id !== updatedRoom._id) return room;
        else return updatedRoom;
      });
    },
    addNewMessage: (state, action) => {
      const newMessage = action.payload;
      if (!newMessage) return;

      const foundRoom = state.userData.rooms.find(
        (room) => room._id === newMessage.roomId
      );
      if (foundRoom) foundRoom.messages.push(newMessage);
    },
    addPrevMessages: (state, action) => {
      const { roomId, prevMessages } = action.payload;
      const room = state.userData.rooms.find((room) => room._id === roomId);
      room.messages.unshift(...prevMessages);
    },
    setFirstMessageInView: (state, action) => {
      state.firstMessageInView = action.payload;
    },
    cleareUserData: (state) => {
      state.userData = {
        _id: '',
        username: '',
        email: '',
        phoneNumber: '',
        photoURL: '',
        contacts: [],
        rooms: [],
        currentRoom: '',
        socketId: '',
      };
    },
    setDisplayInfoSide: (state, action) => {
      state.displayInfoSide = action.payload;
    },
    addDocument: (state, action) => {
      if (action.payload) {
        state.documents = state.documents.map((doc) => ({
          ...doc,
          selected: false,
        }));
        state.documents.push(action.payload);
      } else {
        state.documents = [];
      }
    },
    editDocument: (state, action) => {
      state.documents = state.documents.map((doc) => {
        if (doc.selected) return { ...doc, content: action.payload };
        else return doc;
      });
    },
    viewDocument: (state, action) => {
      state.documents = state.documents.map((doc, index) => {
        if (index === action.payload) {
          return { ...doc, selected: true };
        } else return { ...doc, selected: false };
      });
    },
  },
});

const userReducer = userSlice.reducer;

export const selectUser = (state) => state.user.userData;
export const selectDisplayInfoSide = (state) => state.user.displayInfoSide;
export const selectDocuments = (state) => state.user.documents;

export const {
  setUserData,
  addNewRoom,
  updateRoom,
  addNewMessage,
  addPrevMessages,
  cleareUserData,
  setDisplayInfoSide,
  addDocument,
  editDocument,
  viewDocument,
} = userSlice.actions;

export default userReducer;
