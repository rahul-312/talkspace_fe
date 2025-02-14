import React, { useState, useEffect } from "react";
import {
  sendFriendRequest,
  fetchFriendRequests,
  respondToFriendRequest,
} from "../../friendApi";
import "./AddFriends.css";

function AddFriends() {
  const [friendName, setFriendName] = useState("");
  const [requests, setRequests] = useState([]);
  const [showRequests, setShowRequests] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadFriendRequests = async () => {
      try {
        const requestsData = await fetchFriendRequests();
        setRequests(requestsData);
      } catch (error) {
        setMessage(error.error || "An error occurred.");
      }
    };

    loadFriendRequests();
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

  const toggleRequests = () => {
    setShowRequests(!showRequests);
  };

  const handleAcceptRequest = async (requestId) => {
    try {
      await respondToFriendRequest(requestId, "accept");
      setRequests(requests.filter((request) => request.id !== requestId));
      setMessage("Friend request accepted!");
    } catch (error) {
      setMessage(error.error || "Failed to accept friend request.");
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      await respondToFriendRequest(requestId, "reject");
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
        <h1>Add Friends</h1>
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

      {/* Add Friend Input */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter username..."
          value={friendName}
          onChange={(e) => setFriendName(e.target.value)}
          className="form-control friend-search-input"
        />
        <button onClick={handleAddFriend} className="btn btn-success add-friend-button">
          Send Request
        </button>
      </div>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default AddFriends;
