import useFetchData from '../hooks/useFetchData';
import Sidebar from './sidebar/Sidebar';
import Chat from './chat/Chat';
import Infos from './infos/Infos';
import { useSelector } from 'react-redux';
import { selectUser, selectDisplayInfoSide } from '../app/slices/userSlice';

function WhatsApp() {
  const user = useSelector(selectUser);
  const displayInfos = useSelector(selectDisplayInfoSide);
  console.log('WhatsApp user', user);
  useFetchData();

  return (
    <section className="whatsApp">
      <Sidebar />
      <Chat />
      {displayInfos && <Infos />}
    </section>
  );
}

export default WhatsApp;
