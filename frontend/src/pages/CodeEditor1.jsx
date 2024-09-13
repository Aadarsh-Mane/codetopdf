import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';  // For making HTTP requests
import { initSocket } from '../../socket';

const CodeEditor1 = () => {
    const { roomId } = useParams();
    const location = useLocation();
    const { username } = location.state || {};
    const [socket, setSocket] = useState(null);
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('cpp'); // Default language is C++
    const [output, setOutput] = useState(''); // State for execution output
    const [error, setError] = useState('');
    const [clients, setClients] = useState([]); // State to store connected clients
    const [notification, setNotification] = useState(''); // State for notification messages

    useEffect(() => {
        const init = async () => {
            const socketInstance = await initSocket();
            setSocket(socketInstance);

            socketInstance.emit('join', { roomId, username });

            // Listen for the updated client list
            socketInstance.on('clients-updated', ({ clients }) => {
                setClients(clients);
            });
            // Listen for language change
            socketInstance.on('language-change', ({ language, username }) => {
                setLanguage(language);  // Sync the language across clients
                showNotification(`${username} changed the language to ${language}`);
            });

            socketInstance.on('code-change', ({ code }) => {
                setCode(code);
            });

            socketInstance.on('execution-result', ({ output }) => {
                setOutput(output);
            });

            socketInstance.on('execution-error', (errorMsg) => {
                setError(errorMsg);
            });

            // Listen for code execution notifications
            socketInstance.on('code-executed', ({ username }) => {
                showNotification(`${username} ran the code`);
            });

            return () => {
                socketInstance.disconnect();
            };
        };

        init();
    }, [roomId, username]);

    // Fetch connected clients from the backend route
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.get(`/clients/${roomId}`);
                setClients(response.data);
            } catch (err) {
                console.error("Error fetching clients:", err);
            }
        };
        fetchClients();
    }, [roomId]);

    const handleCodeChange = (e) => {
        const newCode = e.target.value;
        setCode(newCode);

        // Check if the socket is initialized before emitting
        if (socket) {
            socket.emit('code-change', { roomId, code: newCode });
        }
    };

    const handleLanguageChange = (e) => {
        const selectedLanguage = e.target.value;
        setLanguage(selectedLanguage);

        // Emit the language change to the server along with the username
        if (socket) {
            socket.emit('language-change', { roomId, language: selectedLanguage, username });
        }
    };

    const handleExecuteCode = () => {
        if (socket) {
            // Emit code execution event to the server along with the username
            socket.emit('execute-code', { language, code, roomId, username });
        }
    };


    // Function to display notifications
    const showNotification = (message) => {
        setNotification(message);

        // Clear the notification after 3 seconds
        setTimeout(() => {
            setNotification('');
        }, 3000);
    };

    return (
        <div>
            <h1>Room ID: {roomId}</h1>
            <h1>Username: {username}</h1>
            <div>
                <label htmlFor="language">Select Language:</label>
                <select
                    id="language"
                    value={language}
                    onChange={handleLanguageChange}
                >
                    <option value="cpp">C++</option>
                    <option value="python">Python</option>
                    <option value="c">C</option>
                </select>
            </div>
            <textarea
                value={code}
                onChange={handleCodeChange}
                style={{ width: '100%', height: '400px' }}
            />
            <button onClick={handleExecuteCode}>Run Code</button>

            {notification && (
                <div style={{ backgroundColor: '#ffd700', padding: '10px', marginTop: '10px' }}>
                    <strong>{notification}</strong>
                </div>
            )}

            <h2>Connected Clients:</h2>
            <ul>
                {Array.isArray(clients) && clients.length > 0 ? (
                    // Use a Set to remove duplicate usernames
                    [...new Set(clients.map(client => client.username))].map((username, index) => (
                        <li key={index}>{username}</li>
                    ))
                ) : (
                    <li>No clients connected</li>
                )}
            </ul>

            <h2>Output:</h2>
            <pre>{output || error}</pre>
        </div>
    );
};

export default CodeEditor1;
