// Pages/Chatbox/Chatbox.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Chatbox.css'; // Import Chatbox-specific styles

const ChatBox = ({ roomName }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch messages for this room
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/chat/messages/', {
          params: { room_name: roomName },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [roomName]);

  const sendMessage = async () => {
    try {
      await axios.post(
        'http://127.0.0.1:8000/chat/messages/',
        { message },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat-box">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.user}</strong>: {msg.message}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
