import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JoinRoom = () => {
    const [roomId, setRoomId] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const joinRoom = () => {
        if (roomId && username) {
            // Navigate to the Code Editor with room ID and username
            navigate(`/editor/${roomId}`, { state: { username } });
        } else {
            alert('Room ID and Username are required');
        }
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Join Code Editor</h1>
            <input
                type="text"
                placeholder="Room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
            />
            <br />
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <button onClick={joinRoom}>Join</button>
        </div>
    );
};

export default JoinRoom;
