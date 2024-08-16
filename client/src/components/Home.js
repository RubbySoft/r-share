import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
    padding: 20px;
`;

const Title = styled.h1`
    color: #7e57c2;
    margin-bottom: 20px;
    font-size: 3em;
`;

const ToggleButton = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
`;

const Home = ({ toggleTheme }) => {
    return (
        <HomeContainer>
            <ToggleButton onClick={toggleTheme}>Toggle Dark Mode</ToggleButton>
            <Title>R-Share</Title>
            <Link to="/upload"><button>Upload File</button></Link>
            <Link to="/download"><button>Download File</button></Link>
        </HomeContainer>
    );
};

export default Home;
