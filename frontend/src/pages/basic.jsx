import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { initSocket } from '../../socket';

const CodeEditor = () => {
    const { roomId } = useParams();
    const location = useLocation();
    const { username } = location.state || {};

    const [socket, setSocket] = useState(null);
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('cpp'); // Default language is C++
    const [output, setOutput] = useState(''); // State for execution output
    const [error, setError] = useState('');

    useEffect(() => {
        const init = async () => {
            const socketInstance = await initSocket();
            setSocket(socketInstance);

            socketInstance.emit('join', { roomId, username });

            socketInstance.on('joined', ({ clients }) => {
                // Client joined
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

            return () => {
                socketInstance.disconnect();
            };
        };

        init();
    }, [roomId, username]);

    const handleCodeChange = (e) => {
        const newCode = e.target.value;
        setCode(newCode);
        socket.emit('code-change', { roomId, code: newCode });
    };

    const handleExecuteCode = () => {
        if (socket) {
            socket.emit('execute-code', { language, code });
        }
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
                    onChange={(e) => setLanguage(e.target.value)}
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

            <h2>Output:</h2>
            <pre>{output || error}</pre>
        </div>
    );
};

export default CodeEditor;
