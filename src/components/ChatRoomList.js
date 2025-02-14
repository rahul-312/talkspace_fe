import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import "../styles/ChatRoom.css";

const ChatRoomList = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [error, setError] = useState(null);
  const [activeRoomId, setActiveRoomId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Check if there's an active room saved in localStorage
    const savedRoomId = localStorage.getItem('activeRoomId');
    if (savedRoomId) {
      setActiveRoomId(savedRoomId);
      openWebSocket(savedRoomId);  // Reopen WebSocket connection
      fetchRoomAndMessages(savedRoomId);  // Fetch the messages for the saved room
    }

    // Fetch chat rooms
    const fetchChatRooms = async () => {
      const token = localStorage.getItem('access_token');
      try {
        const response = await axios.get('http://127.0.0.1:8000/users/chatrooms/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setChatRooms(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch chat rooms');
      }
    };

    fetchChatRooms();
  }, []);

  const openWebSocket = (roomId) => {
    const token = localStorage.getItem('access_token');
    const ws = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${roomId}/?token=${token}`);

    ws.onopen = () => {
      console.log(`Connected to chat room ${roomId}`);
      socketRef.current = ws;
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('New message:', message);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    ws.onclose = () => {
      console.log(`Disconnected from chat room ${roomId}`);
      socketRef.current = null;
    };

    ws.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };
  };

  const fetchRoomAndMessages = async (roomId) => {
    const token = localStorage.getItem('access_token');
    try {
      const response = await axios.get(`http://127.0.0.1:8000/users/chatrooms/${roomId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { chat_room, messages } = response.data;
      setMessages(messages); // Store the fetched messages
      setActiveRoomId(roomId); // Update the active room ID
    } catch (err) {
      console.error(err);
      setError('Failed to fetch room and messages');
    }
  };

  const handleRoomClick = (roomId) => {
    if (activeRoomId === roomId) {
      socketRef.current?.close();
      setActiveRoomId(null);
      localStorage.removeItem('activeRoomId');  // Remove active room from storage
    } else {
      openWebSocket(roomId);
      fetchRoomAndMessages(roomId);
      localStorage.setItem('activeRoomId', roomId);  // Save active room to storage
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && socketRef.current) {
      const messageData = {
        message: newMessage,
        room_id: activeRoomId,
      };
      socketRef.current.send(JSON.stringify(messageData));
      setNewMessage(''); // Clear input after sending
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h2>Chat Rooms</h2>
      <ul>
        {chatRooms.map((room) => (
          <li key={room.id}>
            <button onClick={() => handleRoomClick(room.id)}>
              {room.name}
            </button>
          </li>
        ))}
      </ul>

      {activeRoomId && (
        <div className="active-room">
          <h3>Room {activeRoomId} is active</h3>
          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className="message">
                <p>{msg.message}</p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="message-input">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message"
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatRoomList;
