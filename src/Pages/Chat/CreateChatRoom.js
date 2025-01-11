import React, { useState } from 'react';
import axiosInstance from '../../api';
import { useNavigate } from 'react-router-dom';

const CreateChatRoom = () => {
  const [userIds, setUserIds] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post('chatrooms/', { users: userIds.split(',').map((id) => id.trim()) })
      .then(() => navigate('/'))
      .catch((error) => console.error(error.response.data));
  };

  return (
    <div>
      <h2>Create Chat Room</h2>
      <form onSubmit={handleSubmit}>
        <label>
          User IDs (comma-separated):
          <input
            type="text"
            value={userIds}
            onChange={(e) => setUserIds(e.target.value)}
            required
          />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateChatRoom;
