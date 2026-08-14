const express = require('express');
const router = express.Router();
const { createRequest, getRequests, updateStatus, deleteMaintenance } = require('../controllers/maintenanceController');
const { protect } = require('../middleware/authMiddleware');

// Define Routes
router.post('/request', protect, createRequest);
router.get('/all', protect, getRequests);
router.put('/:id/status', protect, updateStatus);
router.delete('/:id', protect, deleteMaintenance);

module.exports = router;
