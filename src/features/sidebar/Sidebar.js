import { useSelector } from 'react-redux';
import { selectDisplayChatRooms } from '../../app/slices/sidebarSlice';
import Header from './header/Header';
import Search from './search/Search';
import ChatRooms from './chatRooms/ChatRooms';
import SearchResult from './search/SearchResult';

function Sidebar() {
  const displayChatRooms = useSelector(selectDisplayChatRooms);

  return (
    <section className="sidebar">
      <Header />
      <Search />
      {displayChatRooms ? <ChatRooms /> : <SearchResult />}
    </section>
  );
}

export default Sidebar;
