const express = require('express');
const router = express.Router();
const seguimientoController = require('../controllers/seguimiento.controller');
const verifyToken = require('../middleware/auth.middleware');

// Public routes
router.get('/', seguimientoController.getAllSeguimientos);
router.get('/:id', seguimientoController.getSeguimientoById);
router.get('/caso/:casoId', seguimientoController.getSeguimientosByCasoId);

// Protected routes
router.post('/', verifyToken, seguimientoController.createSeguimiento);
router.put('/:id', verifyToken, seguimientoController.updateSeguimiento);
router.delete('/:id', verifyToken, seguimientoController.deleteSeguimiento);

module.exports = router; 