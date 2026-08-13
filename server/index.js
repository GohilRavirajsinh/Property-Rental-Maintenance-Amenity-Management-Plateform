const express = require('express');
require('dotenv').config(); // Load Environment variables
const connectDB = require('./config/db'); // Import DB Connection
const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const maintenanceRoutes = require('./routes/maintenanceRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

// Initialize app
const app = express();
app.use(express.json());

// Connect to database
connectDB();

// Test Router
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/bookings', bookingRoutes);

// Define the port and start listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});