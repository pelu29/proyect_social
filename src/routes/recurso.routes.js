const express = require('express');
const router = express.Router();
const recursoController = require('../controllers/recurso.controller');
const verifyToken = require('../middleware/auth.middleware');

// Public routes
router.get('/', recursoController.getAllRecursos);
router.get('/:id', recursoController.getRecursoById);
router.get('/caso/:casoId', recursoController.getRecursosByCasoId);

// Protected routes
router.post('/', verifyToken, recursoController.createRecurso);
router.put('/:id', verifyToken, recursoController.updateRecurso);
router.delete('/:id', verifyToken, recursoController.deleteRecurso);

module.exports = router; 