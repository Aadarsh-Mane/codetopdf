/* eslint-disable no-unused-vars */
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-300">
            <div className="w-full max-w-2xl p-12 bg-white shadow-2xl rounded-3xl transform transition duration-500 hover:scale-105">
                <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-8">Join Code Collaboration</h1>
                
                {/* Room ID Input */}
                <div className="mb-6">
                    <label htmlFor="roomId" className="block text-lg text-gray-600 font-semibold mb-2">Room ID</label>
                    <input
                        type="text"
                        id="roomId"
                        placeholder="Enter Room ID"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        className="w-full px-5 py-4 text-lg border border-gray-300 rounded-xl shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    />
                </div>

                {/* Username Input */}
                <div className="mb-8">
                    <label htmlFor="username" className="block text-lg text-gray-600 font-semibold mb-2">Username</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-5 py-4 text-lg border border-gray-300 rounded-xl shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    />
                </div>

                {/* Join Room Button */}
                <button
                    onClick={joinRoom}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all transform hover:scale-105 focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50"
                >
                    Join Room
                </button>

            </div>
        </div>
    );
};

export default JoinRoom;
