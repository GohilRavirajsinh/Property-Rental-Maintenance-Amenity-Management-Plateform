const express = require('express');
const connectDB = require('./config/db') // Import DB Connection
require('dotenv').config(); // Load Environment variables

// Initialize app
const app = express();

// Connect to database
connectDB();

// Test Router
app.get('/', (req, res) => {
    res.send("Backend Server is running!");
});

// Define the port and start listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});