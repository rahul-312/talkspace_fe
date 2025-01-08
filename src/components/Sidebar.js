import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/Sidebar.css";

// Get the logged-in user's ID from the token
const getLoggedInUserId = () => {
  const token = localStorage.getItem('access_token');
  if (token) {
    const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decoding the JWT to get the user info
    return decodedToken.user_id; // Assuming the user ID is stored as "user_id" in the token
  }
  return null;
};

const BASE_URL = 'http://127.0.0.1:8000/users/';

const Sidebar = () => {
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(`${BASE_URL}friend-list/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        setFriends(response.data.friends);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    fetchFriends();
  }, []);

  const handleFriendClick = async (friend) => {
    const loggedInUserId = getLoggedInUserId();
  
    if (loggedInUserId) {
      const requestData = {
        users: [friend.id, loggedInUserId],  // Ensure the users array is correct
      };
  
      console.log("Request Data:", requestData);  // Log request data to check
  
      try {
        const response = await axios.post(`${BASE_URL}chatrooms/`, requestData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
  
        navigate(`/chat/${response.data.id}`);
      } catch (error) {
        console.error('Error creating chat room:', error.response ? error.response.data : error.message);
      }
    }
  };

  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        {friends.map((friend) => (
          <li key={friend.id} onClick={() => handleFriendClick(friend)}>
            <span>{friend.username}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
