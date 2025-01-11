import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../api';

const ChatRoomDetail = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    axiosInstance
      .get(`messages/?room_id=${id}`)
      .then((response) => setMessages(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    axiosInstance
      .post('messages/', { room_id: id, message: newMessage })
      .then((response) => setMessages([...messages, response.data]))
      .catch((error) => console.error(error));
    setNewMessage('');
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <strong>{message.user}</strong>: {message.message} {/* Use 'message' instead of 'text' */}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatRoomDetail;