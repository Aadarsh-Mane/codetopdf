/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios'; // For making HTTP requests
import { initSocket } from '../../socket';

import CodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { javascript } from '@codemirror/lang-javascript';
import { EditorView } from '@codemirror/view';

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

    const getLanguageMode = () => {
        switch (language) {
          case "cpp":
            return cpp();
          case "python":
            return python();
          case "java":
            return java();
          case "javascript":
            return javascript();
          default:
            return cpp();
        }
      };

      const customTheme = EditorView.theme({
        '&.cm-editor': {
          fontSize: '22px', // Set your desired font size here
        },
        '.cm-content': {
          fontFamily: 'monospace', // Set your preferred font family here
        }
      });

    return (
        <div className="max-w-7xl mx-auto p-8 bg-gray-50 shadow-md rounded-lg">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Collaborative Code Editor</h1>
                <div className="text-sm text-gray-600">
                    <span className="block">Room ID: {roomId}</span>
                    <span className="block">Username: {username}</span>
                </div>
            </div>

            <div className="flex items-center space-x-4 mb-4">
                <label htmlFor="language" className="text-lg font-medium text-gray-700">
                    Language:
                </label>
                <select
                    id="language"
                    value={language}
                    onChange={handleLanguageChange}
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="cpp">C++</option>
                    <option value="python">Python</option>
                    <option value="c">C</option>
                </select>
                <button
                    onClick={handleExecuteCode}
                    className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                    Run Code
                </button>
            </div>

            <CodeMirror
                value={code}
                height="400px"
                extensions={[getLanguageMode(), customTheme]}
                onChange={(value) => setCode(value)}
                placeholder="Write your code here..."
            />

            {notification && (
                <div className="mb-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
                    <strong>{notification}</strong>
                </div>
            )}

            <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-700">Connected Clients</h2>
                <ul className="list-disc list-inside text-gray-600">
                    {Array.isArray(clients) && clients.length > 0 ? (
                        [...new Set(clients.map(client => client.username))].map((username, index) => (
                            <li key={index}>{username}</li>
                        ))
                    ) : (
                        <li>No clients connected</li>
                    )}
                </ul>
            </div>

            <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-700">Output</h2>
                <pre className="w-full h-64 p-4 bg-gray-100 border border-gray-300 rounded-lg text-gray-800 whitespace-pre-wrap">
                    {output || error}
                </pre>
            </div>
        </div>
    );
};

export default CodeEditor1;
