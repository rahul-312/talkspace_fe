import React, { useState, useEffect } from 'react';
import './friend_list.css';

const FriendList = () => {
    const [friends, setFriends] = useState([]);  // Initialize as an empty array
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredFriends, setFilteredFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const token = localStorage.getItem('access_token');
                if (!token) {
                    throw new Error('Authentication token is missing');
                }

                const response = await fetch('http://127.0.0.1:8000/users/friend-list/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                console.log('Response status:', response.status);  // Log the status code

                // Ensure response is ok before reading it
                if (!response.ok) {
                    throw new Error('Failed to fetch friends');
                }

                // Read the response body
                const responseData = await response.json();

                // Access the friends list from the response
                const friendsData = responseData.friends || [];

                // Ensure friendsData is an array before setting it
                if (Array.isArray(friendsData)) {
                    setFriends(friendsData);
                } else {
                    throw new Error('Received invalid data format for friends');
                }

                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchFriends();
    }, []);

    useEffect(() => {
        // Ensure friends is always an array before calling filter
        setFilteredFriends(
            Array.isArray(friends)
                ? friends.filter((friend) =>
                      friend.username.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                : []
        );
    }, [searchTerm, friends]);

    return (
        <div className="friend-list-container">
            <input
                type="text"
                placeholder="Search friends..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Loading or error handling */}
            {loading && <p>Loading friends...</p>}
            {error && <p>Error: {error}</p>}

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
        </div>
    );
};

export default FriendList;
