const express = require('express');
const router = express.Router();
const { addProperty, getProperties, deleteProperty } = require('../controllers/propertyController');
const { protect } = require('../middleware/authMiddleware');

// Define Routes
router.post('/add', protect, addProperty); 
router.get('/all', getProperties);
router.delete('/:id', protect, deleteProperty); // Delete property

module.exports = router;
