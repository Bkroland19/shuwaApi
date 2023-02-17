const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const adminMiddleware = require('../middlewares/adminMiddleware');

// Route to create a new admin
router.post('/admin/create', adminController.create);

// Route to login as an admin
router.post('/admin/login', adminController.login);

// Admin-only route to upload a new photo
router.post('/admin/photos/upload', adminMiddleware.requireAdmin, adminController.uploadPhoto);

// Admin-only route to edit an existing photo
router.put('/admin/photos/edit/:id', adminMiddleware.requireAdmin, adminController.editPhoto);

// Admin-only route to delete a photo
router.delete('/admin/photos/delete/:id', adminMiddleware.requireAdmin, adminController.deletePhoto);

module.exports = router;
