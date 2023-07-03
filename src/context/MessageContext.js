import { createContext, useContext, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectUser,
  selectDocuments,
  addDocument,
  editDocument,
  viewDocument,
  addNewMessage,
} from '../app/slices/userSlice';
import { useCreateMessageMutation } from '../app/api/messageApiSlice';
import socket from '../socket';

const msgContext = createContext(null);

export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState({
    content: '',
    document: {},
    createdBy: '',
    accessedBy: [],
    seenBy: [],
    roomId: '',
  });

  const user = useSelector(selectUser);
  const docs = useSelector(selectDocuments);
  const dispatch = useDispatch();

  console.log('docs', docs);

  const [createMessage] = useCreateMessageMutation();

  useEffect(() => {
    if (user.currentRoom) {
      setMessage({
        content: '',
        document: {},
        createdBy: user._id,
        accessedBy: user.currentRoom.accessedBy,
        seenBy: [],
        roomId: user.currentRoom._id,
      });
    }
  }, [user._id, user.currentRoom]);

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const { newMessage } = await createMessage(message).unwrap();
      socket.emit('send new message', newMessage);
      setMessage((prev) => ({ ...prev, content: '', document: {} }));
      dispatch(addNewMessage(newMessage));
    } catch (err) {
      console.log(err);
    }
  };

  const sendMultipleMessages = async (e) => {
    e.preventDefault();

    const messages = docs.map((doc) => {
      const { name, src, type, content } = doc;
      return {
        content,
        document: { name, src, type, selected: false },
        createdBy: message.createdBy,
        accessedBy: message.accessedBy,
        seenBy: message.seenBy,
        roomId: message.roomId,
      };
    });

    try {
      const { newMessages } = await createMessage(messages).unwrap();
      newMessages.forEach((msg) => {
        socket.emit('send new message', msg);
        dispatch(addNewMessage(msg));
      });
    } catch (err) {
      console.log(err);
    }
  };

  const values = {
    user,
    docs,
    message,
    setMessage,
    sendMessage,
    sendMultipleMessages,
    dispatch,
    addDocument,
    editDocument,
    viewDocument,
  };

  return <msgContext.Provider value={values}>{children}</msgContext.Provider>;
};

export const useMsgContext = () => useContext(msgContext);
