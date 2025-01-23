import React, { useState, useEffect } from "react";
import {
  sendFriendRequest,
  fetchFriendRequests,
  fetchFriendsList,
  respondToFriendRequest, // Updated import
} from "../../friendApi"; // Ensure this is the correct API file path
import "./AddFriends.css";

function AddFriends() {
  const [friendName, setFriendName] = useState("");
  const [friendList, setFriendList] = useState([]);
  const [requests, setRequests] = useState([]);
  const [showRequests, setShowRequests] = useState(false);
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadFriendsAndRequests = async () => {
      try {
        const requestsData = await fetchFriendRequests();
        setRequests(requestsData);

        const friendsData = await fetchFriendsList();
        setFriendList(friendsData);
        setFilteredFriends(friendsData);
      } catch (error) {
        setMessage(error.error || "An error occurred.");
      }
    };

    loadFriendsAndRequests();
  }, []);

  const handleAddFriend = async () => {
    if (!friendName.trim()) {
      setMessage("Please enter a friend's username.");
      return;
    }
    try {
      const response = await sendFriendRequest(friendName);
      setMessage(response.message);
      setFriendName("");
    } catch (error) {
      setMessage(error.error || "An error occurred.");
    }
  };

  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setFriendName(searchValue);
    setFilteredFriends(
      friendList.filter((friend) =>
        friend.username.toLowerCase().includes(searchValue)
      )
    );
  };

  const toggleRequests = () => {
    setShowRequests(!showRequests);
  };

  const handleAcceptRequest = async (requestId) => {
    try {
      await respondToFriendRequest(requestId, "accept"); // Accept the request
      setRequests(requests.filter((request) => request.id !== requestId));
      setMessage("Friend request accepted!");
    } catch (error) {
      setMessage(error.error || "Failed to accept friend request.");
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      await respondToFriendRequest(requestId, "reject"); // Reject the request
      setRequests(requests.filter((request) => request.id !== requestId));
      setMessage("Friend request rejected.");
    } catch (error) {
      setMessage(error.error || "Failed to reject friend request.");
    }
  };

  return (
    <div className="add-friends-container">
      {/* Header */}
      <div className="header">
        <h1>Your Friends</h1>
        <button
          className="btn btn-primary pending-requests-button"
          onClick={toggleRequests}
        >
          Pending Requests ({requests.length})
        </button>
      </div>

      {/* Pending Requests */}
      {showRequests && (
        <div className="requests-list">
          <h2>Pending Friend Requests</h2>
          {requests.length > 0 ? (
            requests.map((request) => (
              <div key={request.id} className="request-item">
                <p>{request.sender.username}</p>
                <div className="request-actions">
                  <button
                    className="btn btn-success"
                    onClick={() => handleAcceptRequest(request.id)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRejectRequest(request.id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No pending friend requests.</p>
          )}
        </div>
      )}

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search friends or add new..."
          value={friendName}
          onChange={handleSearchChange}
          className="form-control friend-search-input"
        />
        <button onClick={handleAddFriend} className="btn btn-success add-friend-button">
          Add Friend
        </button>
      </div>

      {/* Friends List */}
      <div className="friends-list">
        {filteredFriends.length > 0 ? (
          filteredFriends.map((friend) => (
            <div key={friend.id} className="friend">
              <p>{friend.username}</p>
            </div>
          ))
        ) : (
          <p>No friends found.</p>
        )}
      </div>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default AddFriends;
