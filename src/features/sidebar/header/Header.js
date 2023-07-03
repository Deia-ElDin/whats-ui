import { useSelector } from 'react-redux';
import { selectUser } from '../../../app/slices/userSlice';
import { Avatar } from '@mui/material';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import Icon from '../../helpers/components/Icon';

function Header() {
  const user = useSelector(selectUser);

  return (
    <div className="header">
      <Avatar
        src={user.photoURL ?? ''}
        alt={user.username?.toLowerCase() ?? 'user'}
        referrerPolicy="no-referrer"
      />

      <div className="headerIcons">
        <Icon icon={<DonutLargeIcon />} title="Status" />
        <Icon icon={<ChatRoundedIcon />} title="New chat" />
        <Icon icon={<MoreVertRoundedIcon />} title="Menu" />
      </div>
    </div>
  );
}

export default Header;
