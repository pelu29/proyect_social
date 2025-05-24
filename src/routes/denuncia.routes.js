const express = require('express');
const router = express.Router();
const denunciaController = require('../controllers/denuncia.controller');
const verifyToken = require('../middleware/auth.middleware');

// Public routes
router.get('/', denunciaController.getAllDenuncias);
router.get('/:id', denunciaController.getDenunciaById);
router.get('/caso/:casoId', denunciaController.getDenunciasByCasoId);

// Protected routes
router.post('/', verifyToken, denunciaController.createDenuncia);
router.put('/:id', verifyToken, denunciaController.updateDenuncia);
router.delete('/:id', verifyToken, denunciaController.deleteDenuncia);

module.exports = router; 