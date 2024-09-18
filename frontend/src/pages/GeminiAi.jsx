/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';

const TextGenerator = () => {
    const [prompt, setPrompt] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:3000/generate-text', {
                prompt,
            });
            setResult(response.data.result);
        } catch (err) {
            console.error('Error:', err);
            setError('Failed to generate text.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>AI Text Generator</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter your prompt"
                    rows="4"
                    cols="50"
                />
                <br />
                <button type="submit" disabled={loading}>
                    {loading ? 'Generating...' : 'Generate Text'}
                </button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {result && (
                <div>
                    <h2>Generated Text:</h2>
                    <p>{result}</p>
                </div>
            )}
        </div>
    );
};

export default TextGenerator;
