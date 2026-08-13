const express = require('express');
const router = express.Router();
const { addProperty, getProperties } = require('../controllers/propertyController');
const { protect } = require('../middleware/authMiddleware');

// Route is guarded by 'protect' middleware
router.post('/add', protect, addProperty); 
router.get('/all', getProperties);

module.exports = router;
