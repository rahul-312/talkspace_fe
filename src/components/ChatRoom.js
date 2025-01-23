import React, { useState, useEffect, useRef } from "react";
import { fetchFriendsList } from "../friendApi"; // Importing the API call function
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000";

const ChatRoom = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [friendList, setFriendList] = useState([]);
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const [loading, setLoading] = useState(false);
  const socketRef = useRef(null);

  // Fetch friend list using the imported function
  useEffect(() => {
    const loadFriendList = async () => {
      try {
        const friends = await fetchFriendsList();
        setFriendList(friends);
      } catch (error) {
        console.error("Error fetching friend list:", error.message);
      }
    };

    loadFriendList();
  }, []);

  // Function to create or get the chat room
  const createOrGetChatRoom = async (friendId) => {
    setLoading(true); // Start loading
    try {
      const token = localStorage.getItem("access_token"); // Fetch token from localStorage (or use a global state/store)

      if (!token) {
        console.error("No token found. Please log in.");
        return null;
      }

      const response = await axios.post(
        "/users/chatrooms/",
        { users: [friendId] },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the Bearer token in the header
          },
        }
      );

      console.log("Chatroom Response:", response.data);
      return response.data; // Expecting chatRoom.id in the response
    } catch (error) {
      console.error("Error creating/fetching chatroom:", error.response || error.message);
      return null;
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    if (!currentRoomId) return;

    // Ensure WebSocket is closed before establishing a new one
    if (socketRef.current) {
      socketRef.current.close();
    }

    const token = localStorage.getItem("access_token"); // Fetch token from localStorage (or use a global state/store)

    if (!token) {
      console.error("No token found. Please log in.");
      return;
    }

    // Establish WebSocket connection with token passed in the URL query params
    socketRef.current = new WebSocket(`ws://localhost:8000/ws/chat/${currentRoomId}/?token=${token}`);

    socketRef.current.onopen = () => {
      console.log("Connected to chat room");
      setIsConnected(true);
    };

    socketRef.current.onclose = () => {
      console.log("Disconnected from chat room");
      setIsConnected(false);
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "authenticated" && data.status === "success") {
        console.log("User authenticated");
      } else if (data.type === "chat_message") {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            username: data.username,
            message: data.message,
            timestamp: data.timestamp,
          },
        ]);
      }
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [currentRoomId]);

  const sendMessage = () => {
    if (message.trim() && isConnected) {
      socketRef.current.send(
        JSON.stringify({
          username: user.username,
          message: message,
        })
      );
      setMessage("");
    }
  };

  const handleFriendClick = (friendId) => {
    createOrGetChatRoom(friendId).then((chatRoom) => {
      if (chatRoom) {
        setCurrentRoomId(chatRoom.id); // Update the current room ID
        console.log("Room ID from chat room: ", chatRoom.id);
      }
    });
  };

  return (
    <div className="chat-room">
      <h3>Chat Room {currentRoomId || "Select a Friend"}</h3>

      {/* Render friend list */}
      <div className="friend-list">
        {friendList.length > 0 ? (
          friendList.map((friend) => (
            <button
              key={friend.id}
              onClick={() => handleFriendClick(friend.id)}
              className="friend-button"
            >
              Chat with {friend.username}
            </button>
          ))
        ) : (
          <p>No friends available to chat.</p>
        )}
      </div>

      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.username}</strong> ({msg.timestamp}): {msg.message}
          </div>
        ))}
      </div>

      {user ? (
        <div className="message-input">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
          />
          <button onClick={sendMessage} disabled={!isConnected}>Send</button>
        </div>
      ) : (
        <div>Please login to send messages</div>
      )}

      {loading && <div>Loading...</div>} {/* Show loading state */}
    </div>
  );
};

export default ChatRoom;
