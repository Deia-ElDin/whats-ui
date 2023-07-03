import { io } from 'socket.io-client';
import { BASE_URL } from './app/api/apislice';

const socket = io(BASE_URL, { autoConnect: false });

export const setEventListener = (currentEvent) => {
  let event;
  if (currentEvent === 'new-chat') event = 'new-chat-receive-message';
  else if (currentEvent === 'live-chat') event = 'live-chat-receive-message';
  return event;
};

export default socket;
