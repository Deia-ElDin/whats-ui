import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, addNewRoom } from '../../../app/slices/userSlice';
import {
  setSearchInputValue,
  selectSearchResult,
  setDisplayChatRooms,
} from '../../../app/slices/sidebarSlice';
// import socket from '../../../socket';
import Result from './Result';
import { useCreateRoomMutation } from '../../../app/api/roomApiSlice';

function SearchResult() {
  const user = useSelector(selectUser);
  const searchResult = useSelector(selectSearchResult);
  const dispatch = useDispatch();

  const [renderResult, setRenderResult] = useState([]);
  const [createRoom] = useCreateRoomMutation();

  useEffect(() => {
    const addContact = (contact) => {};

    const startNewChat = async (otherUser) => {
      // const senderId = user._id;
      // const receiverId = receiver._id;
      const createdBy = user._id;
      const accessedBy = [user._id, otherUser._id];

      try {
        const { newRoom } = await createRoom({
          createdBy,
          accessedBy,
        }).unwrap();
        console.log('newRoom', newRoom);
        dispatch(addNewRoom(newRoom));
      } catch (err) {
        console.log('err', err);
      }
      // socket.emit('start new chat', { senderId, receiverId }, (callback) => {
      //   const { newRoom } = callback;
      //   dispatch(addNewRoom(newRoom));
      // });

      dispatch(setSearchInputValue(''));
      dispatch(setDisplayChatRooms(true));
    };

    setRenderResult(
      Object.entries(searchResult).map(([listName, list]) => {
        if (list.length >= 1) {
          if (listName === 'server') {
            return (
              <Result
                key={listName}
                listName={listName}
                list={list}
                addContact={addContact}
                startNewChat={startNewChat}
              />
            );
          } else return null;
        } else return null;
      })
    );
  }, [searchResult, user, createRoom, dispatch]);

  return <div className="searchResult">{renderResult}</div>;
}

export default SearchResult;
