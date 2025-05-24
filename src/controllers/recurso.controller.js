const recursoService = require('../services/recurso.service');

class RecursoController {
    async getAllRecursos(req, res) {
        try {
            const recursos = await recursoService.getAllRecursos();
            res.json({
                success: true,
                data: recursos
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async getRecursoById(req, res) {
        try {
            const recurso = await recursoService.getRecursoById(req.params.id);
            res.json({
                success: true,
                data: recurso
            });
        } catch (error) {
            res.status(error.message === 'Recurso not found' ? 404 : 500).json({
                success: false,
                message: error.message
            });
        }
    }

    async getRecursosByCasoId(req, res) {
        try {
            const recursos = await recursoService.getRecursosByCasoId(req.params.casoId);
            res.json({
                success: true,
                data: recursos
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async createRecurso(req, res) {
        try {
            const recurso = await recursoService.createRecurso(req.body);
            res.status(201).json({
                success: true,
                data: recurso
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async updateRecurso(req, res) {
        try {
            const recurso = await recursoService.updateRecurso(req.params.id, req.body);
            res.json({
                success: true,
                data: recurso
            });
        } catch (error) {
            res.status(error.message === 'Recurso not found' ? 404 : 400).json({
                success: false,
                message: error.message
            });
        }
    }

    async deleteRecurso(req, res) {
        try {
            await recursoService.deleteRecurso(req.params.id);
            res.json({
                success: true,
                message: 'Recurso deleted successfully'
            });
        } catch (error) {
            res.status(error.message === 'Recurso not found' ? 404 : 500).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = new RecursoController(); 