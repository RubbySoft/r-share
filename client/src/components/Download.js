import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const DownloadContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
    padding: 20px;
`;

const Input = styled.input`
    margin: 10px 0;
    padding: 10px;
    font-size: 1em;
`;

const Download = () => {
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');

    const handleCodeChange = (e) => {
        setCode(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/files/download', { code, password });
            if (res.status === 200) {
                const url = URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'file'); // or specify a filename
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            }
        } catch (err) {
            console.error('Error downloading file', err);
        }
    };

    return (
        <DownloadContainer>
            <h2>Download File</h2>
            <form onSubmit={handleSubmit}>
                <Input type="text" placeholder="Enter 6-digit code" onChange={handleCodeChange} required />
                <Input type="password" placeholder="Enter password" onChange={handlePasswordChange} required />
                <button type="submit">Download</button>
            </form>
        </DownloadContainer>
    );
};

export default Download;
