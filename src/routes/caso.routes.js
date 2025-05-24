const express = require('express');
const router = express.Router();
const casoController = require('../controllers/caso.controller');
const verifyToken = require('../middleware/auth.middleware');

// Public routes
router.get('/', casoController.getAllCasos);
router.get('/:id', casoController.getCasoById);
router.get('/victima/:victimaId', casoController.getCasosByVictimaId);
router.get('/agresor/:agresorId', casoController.getCasosByAgresorId);

// Protected routes
router.post('/', verifyToken, casoController.createCaso);
router.put('/:id', verifyToken, casoController.updateCaso);
router.delete('/:id', verifyToken, casoController.deleteCaso);

module.exports = router; 