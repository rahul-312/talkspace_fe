import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/Sidebar.css";

// Function to decode JWT and get the user ID
const getLoggedInUserId = () => {
  const token = localStorage.getItem('access_token');
  if (!token) return null;

  try {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return decodedToken.user_id; // Assuming user ID is stored as "user_id" in the token
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

const BASE_URL = 'http://127.0.0.1:8000/';

const Sidebar = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const userId = getLoggedInUserId();
        if (!userId) {
          setError('You are not logged in.');
          return;
        }

        // Fetch friends list
        const friendsResponse = await axios.get(`${BASE_URL}users/friend-list/`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
        });
        setFriends(friendsResponse.data.friends || []);

      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFriendClick = async (friend) => {
    const loggedInUserId = getLoggedInUserId();
    if (!loggedInUserId || !friend?.id) {
      setError('Invalid user or friend data.');
      return;
    }

    const requestData = { users: [loggedInUserId, friend.id] };

    try {
      // Check if a chat room already exists
      const response = await axios.get(`${BASE_URL}users/chatrooms/`, {
        params: { users: requestData.users },
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      });

      if (response.data?.length > 0) {
        navigate(`/chat/${response.data[0].id}`); // Navigate to the existing chat room
      } else {
        // Create a new chat room
        const createRoomResponse = await axios.post(`${BASE_URL}users/chatrooms/`, requestData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
        });
        navigate(`/chat/${createRoomResponse.data.id}`); // Navigate to the new chat room
      }
    } catch (err) {
      console.error('Error handling chat room:', err.response?.data || err.message);
      setError('Could not handle chat room. Please try again.');
    }
  };

  return (
    <div className="sidebar">
      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          <div className="sidebar-section">
            <h3>Chats</h3>
            <ul className="sidebar-menu">
              {friends.length === 0 ? (
                <li className="no-friends">No friends found</li>
              ) : (
                friends.map((friend) => (
                  <li
                    key={friend.id}
                    className="friend-item"
                    onClick={() => handleFriendClick(friend)}
                  >
                    <span>{friend.username}</span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
