const agresorService = require('../services/agresor.service');

class AgresorController {
    async getAllAgresores(req, res) {
        try {
            const agresores = await agresorService.getAllAgresores();
            res.json({
                success: true,
                data: agresores
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async getAgresorById(req, res) {
        try {
            const agresor = await agresorService.getAgresorById(req.params.id);
            res.json({
                success: true,
                data: agresor
            });
        } catch (error) {
            res.status(error.message === 'Agresor not found' ? 404 : 500).json({
                success: false,
                message: error.message
            });
        }
    }

    async createAgresor(req, res) {
        try {
            const agresor = await agresorService.createAgresor(req.body);
            res.status(201).json({
                success: true,
                data: agresor
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async updateAgresor(req, res) {
        try {
            const agresor = await agresorService.updateAgresor(req.params.id, req.body);
            res.json({
                success: true,
                data: agresor
            });
        } catch (error) {
            res.status(error.message === 'Agresor not found' ? 404 : 400).json({
                success: false,
                message: error.message
            });
        }
    }

    async deleteAgresor(req, res) {
        try {
            await agresorService.deleteAgresor(req.params.id);
            res.json({
                success: true,
                message: 'Agresor deleted successfully'
            });
        } catch (error) {
            res.status(error.message === 'Agresor not found' ? 404 : 500).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = new AgresorController(); 