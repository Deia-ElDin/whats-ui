import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../../app/slices/userSlice';
import { useMsgContext } from '../../../../../context/MessageContext';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MicIcon from '@mui/icons-material/Mic';
import socket from '../../../../../socket';
import Icon from '../../../../helpers/components/Icon';
import AttachBtns from './AttachBtns';

function UserActions() {
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const { message, setMessage, sendMessage } = useMsgContext();
  const user = useSelector(selectUser);

  const [displayAttachOptions, setDisplayAttachOptions] = useState(false);

  useEffect(() => {
    socket.on('connected', () => setSocketConnected(true));
    socket.on('typing', () => setIsTyping(true));
    socket.on('stop typing', () => setIsTyping(false));

    // return () => {
    //   socket.off('connected', () => setSocketConnected(true));
    //   socket.off('typing', () => setIsTyping(true));
    //   socket.off('stop typing', () => setIsTyping(false));
    // };
  }, []);

  const handleChange = (e) => {
    setMessage((prev) => ({ ...prev, content: e.target.value }));
  };

  const attachBtnsFunctions = () => {};

  return (
    <div className="userInputs">
      <div className="icons">
        <Icon icon={<InsertEmoticonIcon className="emojiIcon" />} />
        <Icon
          icon={
            <AttachFileIcon
              className="attachIcon"
              onClick={() => setDisplayAttachOptions(!displayAttachOptions)}
            />
          }
          title="Attach"
        />
        {displayAttachOptions && (
          <AttachBtns btns="attachBtns" handleFunctions={attachBtnsFunctions} />
        )}
      </div>
      <form className="messageForm">
        <input
          type="text"
          placeholder="Type a message"
          value={message.content}
          onChange={handleChange}
        />
        <button onClick={sendMessage}>Send a message</button>
      </form>
      <Icon icon={<MicIcon className="micIcon" />} />
    </div>
  );
}

export default UserActions;
