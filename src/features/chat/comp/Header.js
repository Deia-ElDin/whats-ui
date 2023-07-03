import { useState, useEffect } from 'react';
import { useMsgContext } from '../../../context/MessageContext';
import { Avatar } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import Icon from '../../helpers/components/Icon';

function Header() {
  const { user } = useMsgContext();
  const [header, setHeader] = useState({
    name: '',
    text: '',
    photoURL: '',
  });
  // const [displayText, setDisplayText] = useState(true);

  // useEffect(() => {
  //   console.log('set time out effect');
  //   const timeOutId = setTimeout(() => {
  //     setDisplayText(false);
  //   }, 5000);

  //   return () => clearTimeout(timeOutId);
  // }, []);

  useEffect(() => {
    if (user.currentRoom) {
      const room = user.rooms.find((room) => room._id === user.currentRoom._id);
      const otherUser = room.accessedBy?.find(
        (person) => person._id !== user._id
      );

      setHeader({
        name: otherUser?.email ?? otherUser?.phoneNumber ?? '',
        text: 'Click here for contact info',
        photoURL: otherUser?.photoURL ?? '',
      });
    }
  }, [user]);

  return (
    <div className="header" title={header.name}>
      <div className="leftHeaderDiv">
        <Avatar
          className="avatar"
          src={header.photoURL ?? ''}
          alt={header.Avatarname?.toLowerCase() ?? ''}
          referrerPolicy="no-referrer"
        />
        <div className="info">
          <h2 className="name">{header.name}</h2>
          <div className="message">
            <p className="text">{true && header.text}</p>
          </div>
        </div>
      </div>

      <div className="rightHeaderDiv">
        <Icon icon={<SearchOutlinedIcon />} title="Search..." />
        <Icon icon={<MoreVertRoundedIcon />} title="Menu" />
      </div>
    </div>
  );
}

export default Header;
