import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectUser,
  addNewRoom,
  updateRoom,
  addNewMessage,
} from '../../../../../app/slices/userSlice';
import { useGetRoomQuery } from '../../../../../app/api/roomApiSlice';
import { setDate } from '../../../../helpers/fn';
import ScrollableFeed from 'react-scrollable-feed';
import socket from '../../../../../socket';
import Message from './message/Message';

function Body() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [roomId, setRoomId] = useState(null);
  const [skip, setSkip] = useState(true);
  const [renderMessages, setRenderMessages] = useState([]);
  const dateRef = useRef();

  const { data, isSuccess } = useGetRoomQuery(roomId, { skip });

  // console.log('WhatsApp user', user);

  // useEffect(() => {
  //   // console.log('receive private message useEffect');
  //   const joinFn = (roomId) => {
  //     // console.log('roomId', roomId);
  //     // const roomId = modifiedRoom._id;
  //     // dispatch(addNewRoom(modifiedRoom));
  //     socket.emit('join room', { roomId, receiverId: user._id }, () => {
  //       // console.log('join room');
  //     });
  //   };

  //   const updateFn = (roomId) => {
  //     socket.emit('update room', { roomId, userId: user._id }, (callback) => {
  //       // console.log('update room');
  //       // console.log('callback', callback);
  //       const { updatedRoom } = callback;
  //       const existRoom = user.rooms.find(
  //         (room) => room._id === updatedRoom._id
  //       );
  //       if (existRoom) dispatch(updateRoom(updatedRoom));
  //       else dispatch(addNewRoom(updatedRoom));
  //     });
  //   };

  //   socket.on('join request', joinFn);

  //   socket.on('update request', updateFn);

  //   return () => {
  //     socket.off('join request', joinFn);
  //     socket.off('update request', updateFn);
  //   };
  //   // socket.on('receive one to one message', (roomId, message) => {
  //   //   console.log('receive one to one message');
  //   //   console.log('roomId', roomId);
  //   //   console.log('message', message);
  //   // });
  // }, [user, dispatch]);

  // useEffect(() => {
  //   console.log('receive private message useEffect');
  //   const callback = (room, message) => {
  //     console.log('room', room);
  //     console.log('message', message);
  //     const foundRoom = user.rooms.find(
  //       (storedRoom) => storedRoom._id === room._id
  //     );

  //     if (foundRoom) dispatch(addNewMessage(message));
  //     else dispatch(addNewRoom(room));
  //   };

  //   socket.on('receive private message', callback);
  //   return () => socket.off('receive private message', callback);
  // }, [user._id, user.rooms, dispatch]);

  useEffect(() => {
    const callback = (newMessage) => {
      console.log('receive new message');
      console.log('newMessage', newMessage);
      const isRoomExist = user.rooms?.find(
        (room) => room._id === newMessage.roomId
      );
      if (isRoomExist) dispatch(addNewMessage(newMessage));
      else {
        setRoomId(newMessage.roomId);
        setSkip(false);
      }
    };
    socket.on('receive new message', callback);

    return () => socket.off('receive new message', callback);
  }, [user.rooms, dispatch]);

  useEffect(() => {
    if (isSuccess && data) {
      const { room } = data;
      dispatch(addNewRoom(room));
      setRoomId(null);
      setSkip(true);
    }
  }, [data, isSuccess, dispatch]);

  useEffect(() => {
    const currentRoomId = user.currentRoom._id;
    const currentRoom = user.rooms.find((room) => room._id === currentRoomId);
    const messagesList = currentRoom?.messages ? currentRoom.messages : [];

    // console.log('messagesList', messagesList);
    if (messagesList.length >= 1) {
      const lastIndex = messagesList.length - 1;
      setRenderMessages(
        messagesList.map((message, index) => {
          // const { content, attachedFiles } = message;
          const date = setDate(message.createdAt);
          if (index === 0) dateRef.current = date;
          const messageComp = (
            <Message
              key={message._id}
              sent={user._id === message.createdBy ? true : false}
              date={date !== dateRef.current || index === 0 ? date : false}
              message={message}
              firstMessage={index === 0 ? true : false}
              lastMessage={index === lastIndex ? true : false}
            />
          );
          if (date !== dateRef.current) dateRef.current = date;
          return messageComp;
        })
      );
    }
  }, [user]);

  const options = { forceScroll: true };
  return (
    <div className="body">
      <ScrollableFeed options={options}>{renderMessages}</ScrollableFeed>
    </div>
  );
}

export default Body;
