import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Upload from './components/Upload';
import Download from './components/Download';

const App = ({ toggleTheme }) => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home toggleTheme={toggleTheme} />} />
                <Route path="/upload" element={<Upload toggleTheme={toggleTheme}  />} />
                <Route path="/download" element={<Download toggleTheme={toggleTheme} />} />
            </Routes>
        </Router>
    );
};

export default App;
