import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const UploadContainer = styled.div`
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

const Upload = () => {
    const [file, setFile] = useState(null);
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file || !password) {
            alert('Please select a file and set a password.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('password', password);

        try {
            // Make the API request to upload the file and get the code
            const res = await axios.post('/api/files/upload', formData);
            setCode(res.data.code);
        } catch (err) {
            console.error('Error uploading file:', err);
            alert('There was an error uploading your file. Please try again.');
        }
    };

    return (
        <UploadContainer>
            <h2>Upload File</h2>
            <form onSubmit={handleSubmit}>
                <Input type="file" onChange={handleFileChange} required />
                <Input type="password" placeholder="Set a password" onChange={handlePasswordChange} required />
                <button type="submit">Submit</button>
            </form>
            {code && <p>Your file code: {code}</p>}
        </UploadContainer>
    );
};

export default Upload;
