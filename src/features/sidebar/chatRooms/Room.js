// import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../../app/slices/userSlice';
import { Avatar } from '@mui/material';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useDeleteChatMutation } from '../../../app/api/roomApiSlice';
import { setDate, setTime } from '../../helpers/fn';

function Room({ name, photoURL, room }) {
  const dispatch = useDispatch();

  const { _id, seen, mute } = room;

  const messagesList = room?.messages ? room.messages : [];
  const lastMessage = messagesList ? messagesList[messagesList.length - 1] : '';
  let date = lastMessage ? setDate(lastMessage.createdAt) : '';
  if (date === 'Today') date = setTime(lastMessage.createdAt);

  const handleClick = () => {
    dispatch(setUserData({ currentRoom: room }));
  };

  const [deleteChat] = useDeleteChatMutation();

  const deleteRoom = async () => {
    try {
      console.log(' room._id', room._id);
      const roomId = room._id;
      await deleteChat(roomId);
      console.log('deleted Successfuly');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id={_id} className="room" onClick={handleClick}>
      <div className="leftRoomDiv">
        <Avatar
          className="avatar"
          src={photoURL}
          alt={name?.toLowerCase()}
          referrerPolicy="no-referrer"
        />
        <div className="info">
          <h2 className="name">{name}</h2>
          {lastMessage && (
            <div className="lastMessage">
              {seen && <DoneAllIcon />}
              <p className="message">{lastMessage.msg}</p>
            </div>
          )}
        </div>
      </div>

      <div className="rightRoomDiv">
        {date && (
          <p id={_id} className="lastMessageDate">
            {date}
          </p>
        )}
        <div className="icons">
          {mute && <VolumeOffIcon />}
          <ArrowForwardIosIcon className="arrowIcon" onClick={deleteRoom} />
        </div>
      </div>
    </div>
  );
}

export default Room;
