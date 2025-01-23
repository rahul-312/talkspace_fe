import axios from "axios";

const API_URL = 'http://127.0.0.1:8000/users';

// Function to get the JWT token from local storage (or another storage method)
const getAuthToken = () => {
  return localStorage.getItem('access_token'); // Assuming token is stored in localStorage
};

// Add token to headers if available
const getHeaders = () => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Fetch the list of pending friend requests
export const fetchFriendRequests = async () => {
  try {
    const headers = getHeaders();
    const response = await axios.get(`${API_URL}/pending-requests/`, { headers });
    return response.data.requests; // Assuming response structure includes 'requests'
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to fetch friend requests");
  }
};

// Send a friend request (passing the receiver ID directly)
export const sendFriendRequest = async (username) => {
  try {
    const headers = getHeaders();
    const sendResponse = await axios.post(
      `${API_URL}/send-friend-request/`,
      { receiver: username },  // Send receiverId directly
      { headers }
    );

    return sendResponse.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to send friend request");
  }
};

// Respond to a friend request (accept or reject)
export const respondToFriendRequest = async (requestId, action) => {
  try {
    const headers = getHeaders();
    const response = await axios.post(
      `${API_URL}/respond-to-friend-request/${requestId}/`,
      { action },
      { headers }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to respond to friend request");
  }
};

// Fetch the list of friends
export const fetchFriendsList = async () => {
  try {
    const headers = getHeaders();
    const response = await axios.get(`${API_URL}/friend-list/`, { headers });
    return response.data.friends; // Assuming response structure includes 'friends'
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to fetch friends list");
  }
};
