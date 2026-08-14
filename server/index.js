const express = require('express');
require('dotenv').config(); // Load Environment variables
const connectDB = require('./config/db'); // Import DB Connection
const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const maintenanceRoutes = require('./routes/maintenanceRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const amenityRoutes = require('./routes/amenityRoutes');
const cors = require('cors');

// Initialize app
const app = express();
app.use(cors());
app.use(express.json());

// Connect to database
connectDB();

// Test Router
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/amenities', amenityRoutes);

// SERVE FRONTEND (Fix for React Router 404 on refresh in Production)
const path = require('path');

// 1. Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, '../client/dist')));

// 2. Catch-all route: For any request that doesn't match an API route, send back index.html
app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Define the port and start listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});