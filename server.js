const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const fileRoutes = require('./routes/files');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files

// MongoDB connection
// const mongoURI = 'mongodb://localhost:27017/rshare'; // For local MongoDB
const mongoURI = 'mongodb+srv://worksiddheshmore:JMN1tLy58vTlcXYO@r-share.q1yu7.mongodb.net/?retryWrites=true&w=majority&appName=r-share'; // For MongoDB Atlas

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/files', fileRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
