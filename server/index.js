const express = require('express');
require('dotenv').config(); // Load Environment variables
const connectDB = require('./config/db'); // Import DB Connection
const authRoutes = require('./routes/authRoutes');

// Initialize app
const app = express();
app.use(express.json());

// Connect to database
connectDB();

// Test Router
app.use('/api/auth', authRoutes);

// Define the port and start listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});