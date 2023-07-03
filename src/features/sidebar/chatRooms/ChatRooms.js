import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../app/slices/userSlice';
import socket from '../../../socket';
import Room from './Room';

function ChatRooms() {
  const user = useSelector(selectUser);
  const [renderRooms, setRenderRooms] = useState([]);

  useEffect(() => {
    // console.log('chatRooms useEffect');
    // console.log('user.rooms', user.rooms);
    if (user.rooms.length >= 1) {
      setRenderRooms(
        user.rooms.map((room) => {
          socket.emit('join room', room._id);

          if (room.messages.length === 0 && room.createdBy !== user._id) {
            return null;
          } else {
            const otherUser = room.accessedBy?.find(
              (person) => person._id !== user._id
            );
            return (
              <Room
                key={room._id}
                name={otherUser?.email ?? otherUser?.phoneNumber ?? ''}
                photoURL={otherUser?.photoURL ?? ''}
                room={room}
              />
            );
          }
        })
      );
    }
  }, [user._id, user.rooms]);

  return <div className="chatRooms">{renderRooms}</div>;
}

export default ChatRooms;
