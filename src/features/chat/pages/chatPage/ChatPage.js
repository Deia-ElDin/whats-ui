import React from 'react';
import Header from '../../comp/Header';
import Body from './body/Body';
import UserActions from './actions/UserActions';

function ChatPage() {
  return (
    <>
      <Header />
      <Body />
      <UserActions />
    </>
  );
}

export default ChatPage;
