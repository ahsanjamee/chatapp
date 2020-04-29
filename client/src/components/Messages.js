import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import MessageElements from '../components/MessageElements';

const Messages = ({ messages, name }) => (
  <ScrollToBottom className="messages">
    {messages.map((message, i) => <div key={i}><MessageElements message={message} name={name}/></div>)}
  </ScrollToBottom>
);

export default Messages;