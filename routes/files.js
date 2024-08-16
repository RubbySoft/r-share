const express = require('express');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const File = require('../models/File');

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Upload route
router.post('/upload', upload.single('file'), async (req, res) => {
    const { password } = req.body;
    const file = req.file;

    if (!file || !password) {
        return res.status(400).send('File and password are required.');
    }

    // Generate a 6-digit code
    const code = crypto.randomBytes(3).toString('hex');

    // Save to MongoDB
    try {
        const newFile = new File({
            code: code,
            password: password,
            filePath: file.path
        });
        await newFile.save();

        res.json({ code });
    } catch (err) {
        console.error('Error saving file:', err);
        res.status(500).send('Server error.');
    }
});

// Download route
router.post('/download', async (req, res) => {
    const { code, password } = req.body;

    try {
        const file = await File.findOne({ code: code, password: password });

        if (!file) {
            return res.status(404).send('File not found or password incorrect.');
        }

        const filePath = path.join(__dirname, '..', file.filePath);
        res.download(filePath, (err) => {
            if (err) {
                console.error('Error downloading file:', err);
                res.status(500).send('Error downloading file.');
            }
        });
    } catch (err) {
        console.error('Error finding file:', err);
        res.status(500).send('Server error.');
    }
});

module.exports = router;
