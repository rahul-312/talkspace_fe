import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api';
import { Link } from 'react-router-dom';

const ChatRoomList = () => {
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    axiosInstance
      .get('chatrooms/')
      .then((response) => setChatRooms(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h2>Chat Rooms</h2>
      <Link to="/create-room">Create Chat Room</Link>
      <ul>
        {chatRooms.map((room) => (
          <li key={room.id}>
            <Link to={`/chatroom/${room.id}`}>{room.name || 'Unnamed Room'}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatRoomList;
