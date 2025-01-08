import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/Dashboard.css";

const BASE_URL = 'http://127.0.0.1:8000/users/';

const Dashboard = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await axios.get(`${BASE_URL}chatrooms/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        setChatRooms(response.data);
      } catch (error) {
        console.error('Error fetching chat rooms:', error);
      }
    };

    fetchChatRooms();
  }, []);

  const handleChatClick = (chatRoom) => {
    // Navigate to the selected chat room
    navigate(`/chat/${chatRoom.id}`);
  };

  return (
    <div className="dashboard">
      <h2>All Chats</h2>
      <ul className="chat-room-list">
        {chatRooms.map((chatRoom) => (
          <li key={chatRoom.id} onClick={() => handleChatClick(chatRoom)}>
            <span>{chatRoom.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
