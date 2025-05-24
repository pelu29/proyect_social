const seguimientoService = require('../services/seguimiento.service');

class SeguimientoController {
    async getAllSeguimientos(req, res) {
        try {
            const seguimientos = await seguimientoService.getAllSeguimientos();
            res.json({
                success: true,
                data: seguimientos
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async getSeguimientoById(req, res) {
        try {
            const seguimiento = await seguimientoService.getSeguimientoById(req.params.id);
            res.json({
                success: true,
                data: seguimiento
            });
        } catch (error) {
            res.status(error.message === 'Seguimiento not found' ? 404 : 500).json({
                success: false,
                message: error.message
            });
        }
    }

    async getSeguimientosByCasoId(req, res) {
        try {
            const seguimientos = await seguimientoService.getSeguimientosByCasoId(req.params.casoId);
            res.json({
                success: true,
                data: seguimientos
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async createSeguimiento(req, res) {
        try {
            // Check user role for authorization
            const userRole = req.user.role; // Role is attached by verifyToken middleware
            if (userRole !== 'profesional' && userRole !== 'admin') {
                return res.status(403).json({
                    success: false,
                    message: 'Forbidden: Only professionals or administrators can create seguimientos.'
                });
            }

            const seguimiento = await seguimientoService.createSeguimiento(req.body);
            res.status(201).json({
                success: true,
                data: seguimiento
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async updateSeguimiento(req, res) {
        try {
            const seguimiento = await seguimientoService.updateSeguimiento(req.params.id, req.body);
            res.json({
                success: true,
                data: seguimiento
            });
        } catch (error) {
            res.status(error.message === 'Seguimiento not found' ? 404 : 400).json({
                success: false,
                message: error.message
            });
        }
    }

    async deleteSeguimiento(req, res) {
        try {
            await seguimientoService.deleteSeguimiento(req.params.id);
            res.json({
                success: true,
                message: 'Seguimiento deleted successfully'
            });
        } catch (error) {
            res.status(error.message === 'Seguimiento not found' ? 404 : 500).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = new SeguimientoController(); 