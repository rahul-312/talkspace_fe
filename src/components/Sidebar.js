import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/Sidebar.css";

const BASE_URL = 'http://127.0.0.1:8000/users/';

const Sidebar = () => {
  const [friends, setFriends] = useState([]);

  // Fetch friends from the API
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(`${BASE_URL}friend-list/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}` // Assuming token is stored in localStorage
          }
        });
        setFriends(response.data.friends);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    fetchFriends();
  }, []);

  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        {friends.map((friend) => (
          <li key={friend.id}>
            <span>{friend.username}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
