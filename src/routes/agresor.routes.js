const express = require('express');
const router = express.Router();
const agresorController = require('../controllers/agresor.controller');
const verifyToken = require('../middleware/auth.middleware');

// Public routes
router.get('/', agresorController.getAllAgresores);
router.get('/:id', agresorController.getAgresorById);

// Protected routes
router.post('/', verifyToken, agresorController.createAgresor);
router.put('/:id', verifyToken, agresorController.updateAgresor);
router.delete('/:id', verifyToken, agresorController.deleteAgresor);

module.exports = router; 