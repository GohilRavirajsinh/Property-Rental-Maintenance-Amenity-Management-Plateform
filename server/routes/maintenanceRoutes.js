const express = require('express');
const router = express.Router();
const { createRequest, getRequests } = require('../controllers/maintenanceController');
const { protect } = require('../middleware/authMiddleware');

router.post('/request', protect, createRequest);
router.get('/all', protect, getRequests);

module.exports = router;
