// index.js
const express = require('express');
require('dotenv').config();
const connectDB = require('./Modules/Database');
const BookRoutes = require('./Routes/Book.routes');
const Authroutes = require('./Routes/Auth.routes');
const cors = require('cors');

// Connect to MongoDB
connectDB();

const index = express();
index.use(express.json());
index.use(cors());

// Routes
index.use('/api/auth', Authroutes); // Login and Registration
index.use('/api', BookRoutes);     // Book API

// Ping route to check server
index.use('/ping', (req, res) => {
    res.status(200).json({ message: "PONG" });
});

const PORT = process.env.PORT || 3000;
index.listen(PORT, () => console.log(`Server running on port ${PORT}`));
