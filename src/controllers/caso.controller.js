const casoService = require('../services/caso.service');

class CasoController {
    async getAllCasos(req, res) {
        try {
            const casos = await casoService.getAllCasos();
            res.json({
                success: true,
                data: casos
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async getCasoById(req, res) {
        try {
            const caso = await casoService.getCasoById(req.params.id);
            res.json({
                success: true,
                data: caso
            });
        } catch (error) {
            res.status(error.message === 'Caso not found' ? 404 : 500).json({
                success: false,
                message: error.message
            });
        }
    }

    async getCasosByVictimaId(req, res) {
        try {
            const casos = await casoService.getCasosByVictimaId(req.params.victimaId);
            res.json({
                success: true,
                data: casos
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async getCasosByAgresorId(req, res) {
        try {
            const casos = await casoService.getCasosByAgresorId(req.params.agresorId);
            res.json({
                success: true,
                data: casos
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async createCaso(req, res) {
        try {
            const caso = await casoService.createCaso(req.body);
            res.status(201).json({
                success: true,
                data: caso
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async updateCaso(req, res) {
        try {
            const caso = await casoService.updateCaso(req.params.id, req.body);
            res.json({
                success: true,
                data: caso
            });
        } catch (error) {
            res.status(error.message === 'Caso not found' ? 404 : 400).json({
                success: false,
                message: error.message
            });
        }
    }

    async deleteCaso(req, res) {
        try {
            await casoService.deleteCaso(req.params.id);
            res.json({
                success: true,
                message: 'Caso deleted successfully'
            });
        } catch (error) {
            res.status(error.message === 'Caso not found' ? 404 : 500).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = new CasoController(); 