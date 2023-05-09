import './chatBox.scss';
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

// Initialize the socket.io client
const socket = io("http://localhost:8800");

const ChatBox = () => {
  // State variables
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [joined, setJoined] = useState(false);

  // Ref to scroll to the bottom of the messages
  const messagesEndRef = useRef(null);

  // Set up socket listeners for chat and update events
  useEffect(() => {
    socket.on('update', (update) => {
      setMessages((prevMessages) => [...prevMessages, { type: 'update', text: update }]);
    });

    socket.on('chat', (chatMessage) => {
      setMessages((prevMessages) => [...prevMessages, { type: 'chat', ...chatMessage }]);
    });

    return () => {
      // Remove socket listeners when the component unmounts
      socket.off('update');
      socket.off('chat');
    };
  }, []);

  // Scroll to the bottom of the messages when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle joining the chat
  const joinChat = () => {
    if (username.length === 0) {
      return;
    }
    socket.emit('newuser', username);
    setJoined(true);
  };

  // Handle sending a message
  const sendMessage = () => {
    if (message.length === 0) {
      return;
    }

    socket.emit('chat', {
      username,
      text: message,
    });

    setMessages((prevMessages) => [...prevMessages, { type: 'my', username, text: message }]);
    setMessage('');
  };

  // Render a message based on its type
  const renderMessage = (message) => {
    if (message.type === 'my') {
      return (
        <div className="message my-message">
          <div>
            <div className="name">You</div>
            <div className="text">{message.text}</div>
          </div>
        </div>
      );
    } else if (message.type === 'chat') {
      return (
        <div className="message other-message">
          <div>
            <div className="name">{message.username}</div>
            <div className="text">{message.text}</div>
          </div>
        </div>
      );
    } else if (message.type === 'update') {
      return <div className="update">{message.text}</div>;
    }
  };

  // Render the chat box
  return (
    <div className="chat">
      {!joined ? (
        // Render the join screen if the user has not joined yet
        <div className="join-screen">
          <h2>Join Discussion Room</h2>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Your Name"
          />
          <button onClick={joinChat}>Join</button>
        </div>
      ) : (
        // Render the chat screen if the user has joined
        <div className="chat-screen">
          <div className="header">
            <div className="logo">Discussion Room</div>
          </div>
          <div className="messages">
            {messages.map((message, index) =>
            (
              <React.Fragment key={index}>
                {renderMessage(message)}
                {index === messages.length - 1 ? <div ref={messagesEndRef} /> : null}
              </React.Fragment>
            ))}
          </div>
          <div className="type-box">
            <input
              type="text"
              id="message-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here"
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
