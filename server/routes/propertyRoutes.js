const express = require('express');
const router = express.Router();
const { addProperty, getProperties, deleteProperty, updateProperty } = require('../controllers/propertyController');
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../config/cloudinaryConfig'); // Multer Upload Middleware

// Define Routes
router.post('/add', protect, upload.single('image'), addProperty); 
router.get('/all', getProperties);
router.delete('/:id', protect, deleteProperty); // Delete property
router.put('/:id', protect, upload.single('image'), updateProperty); // Update property

module.exports = router;
