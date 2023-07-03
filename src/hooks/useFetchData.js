import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  useGetAllRoomsQuery,
  // useGetCurrentRoomQuery,
} from '../app/api/roomApiSlice';
// import { useGetLastMessageQuery } from '../app/api/messageApiSlice';
// import { useGetCurrentRoomMessagesQuery } from '../app/api/messageApiSlice';
import {
  selectUser,
  setUserData,
  // addNewMessage,
} from '../app/slices/userSlice';

const useFetchData = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [skipRooms, setSkipRooms] = useState(false);

  const { data: fetchRooms, isSuccess: isFetchRoomsSuccess } =
    useGetAllRoomsQuery(user._id, { skip: skipRooms });

  // const {data: currentRoom, isSuccess} = useGetCurrentRoomQuery(roomId)

  // const { data: fetchLastMessage, isSuccess: isFetchLastMessageSuccess } =
  //   useGetLastMessageQuery(user?.currentRoom?._id ?? '');

  // const { data: fetchAllMsgs, isSuccess: isFetchAllMsgsSuccess } =
  //   useGetCurrentRoomMessagesQuery(user?.currentRoom?._id ?? '');

  useEffect(() => {
    if (isFetchRoomsSuccess) {
      setSkipRooms(true);
      const rooms = fetchRooms.rooms.map((room) => {
        const modifiedMessages = [];
        room.messages.forEach((message) => modifiedMessages.unshift(message));
        return { ...room, messages: modifiedMessages };
      });
      dispatch(setUserData({ rooms }));
    }

    // if (skipRooms && isFetchLastMessageSuccess) {
    //   console.log('something changed');
    //   const { lastMessage } = fetchLastMessage;
    //   console.log('lastMessage', lastMessage);
    //   dispatch(addNewMessage(lastMessage));
    // }

    // if (isFetchAllMsgsSuccess) {
    //   const { messages } = fetchAllMsgs;
    //   console.log('fetchAllMsgs', messages);
    // }
  }, [
    fetchRooms,
    isFetchRoomsSuccess,
    // skipRooms,
    // fetchLastMessage,
    // isFetchLastMessageSuccess,
    // isFetchAllMsgsSuccess,
    // user.currentRoom,
    // fetchAllMsgs,
    dispatch,
  ]);
};

export default useFetchData;
