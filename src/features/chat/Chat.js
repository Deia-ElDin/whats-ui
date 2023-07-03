import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectUser,
  selectDocuments,
  addPrevMessages,
} from '../../app/slices/userSlice';
import { MessageProvider } from '../../context/MessageContext';
import socket from '../../socket';
import PreChatPage from './pages/preChatPage/PreChatPage';
import DocPage from './pages/docPage/DocPage';
import ChatPage from './pages/chatPage/ChatPage';

function Chat() {
  const user = useSelector(selectUser);
  const documents = useSelector(selectDocuments);
  const dispatch = useDispatch();
  const pageRef = useRef(2);

  const handleScroll = (e) => {
    const room = user.rooms.find((room) => room._id === user.currentRoom._id);
    const roomId = room._id;
    const firstMessages = room.messages[0];
    const page = pageRef.current;

    if (e.currentTarget.scrollTop === 0) {
      socket.emit(
        'get prev messages',
        { roomId, page, firstMessages },
        (callback) => {
          const { prevMessages, gotAllData } = callback;
          if (prevMessages.length >= 1) {
            dispatch(addPrevMessages({ roomId, prevMessages }));
            pageRef.current += 1;
          }
          if (gotAllData) pageRef.current = 2;
        }
      );
    }
  };

  return (
    <MessageProvider>
      <section className="chat" onScroll={handleScroll}>
        {user.currentRoom ? (
          documents.length >= 1 ? (
            <DocPage />
          ) : (
            <ChatPage />
          )
        ) : (
          <PreChatPage />
        )}
      </section>
    </MessageProvider>
  );
}

export default Chat;
