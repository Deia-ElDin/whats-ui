import { Routes, Route } from 'react-router-dom';
import Layout from './features/layout/Layout';
import SignIn from './features/signIn/SignIn';
import Phone from './features/signIn/Phone';
import RequiredAuth from './features/auth/RequiredAuth';
import WhatsApp from './features/WhatsApp';
import './sass/App.css';

// optionBtns
// 1- sense a click outside the div & close the btns
// 2- check the distance above and below the arrow and set the style accordignly

// TODO incase first user deleted the room yet the 2nd user didn't then the first user started new chat, the 2nd user must still hv the same chat and not the new one
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        {/* <Route index element={<SignIn />}></Route> */}
        <Route index element={<SignIn />} />
        <Route path="phone" element={<Phone />} />

        {/* protected routes */}
        <Route element={<RequiredAuth />}>
          <Route path="chats" element={<WhatsApp />}></Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

// add the sounds
