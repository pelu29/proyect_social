const express = require('express');
const router = express.Router();
const victimaController = require('../controllers/victima.controller');
const verifyToken = require('../middleware/auth.middleware');

// Public routes
router.get('/', victimaController.getAllVictimas);
router.get('/:id', victimaController.getVictimaById);

// Protected routes
router.post('/', verifyToken, victimaController.createVictima);
router.put('/:id', verifyToken, victimaController.updateVictima);
router.delete('/:id', verifyToken, victimaController.deleteVictima);

module.exports = router; 