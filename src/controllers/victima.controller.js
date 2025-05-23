const victimaService = require('../services/victima.service');

class VictimaController {
    async getAllVictimas(req, res) {
        try {
            const victimas = await victimaService.getAllVictimas();
            res.json({
                success: true,
                data: victimas
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async getVictimaById(req, res) {
        try {
            const victima = await victimaService.getVictimaById(req.params.id);
            res.json({
                success: true,
                data: victima
            });
        } catch (error) {
            res.status(error.message === 'Victim not found' ? 404 : 500).json({
                success: false,
                message: error.message
            });
        }
    }

    async createVictima(req, res) {
        try {
            const victima = await victimaService.createVictima(req.body);
            res.status(201).json({
                success: true,
                data: victima
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async updateVictima(req, res) {
        try {
            const victima = await victimaService.updateVictima(req.params.id, req.body);
            res.json({
                success: true,
                data: victima
            });
        } catch (error) {
            res.status(error.message === 'Victim not found' ? 404 : 400).json({
                success: false,
                message: error.message
            });
        }
    }

    async deleteVictima(req, res) {
        try {
            await victimaService.deleteVictima(req.params.id);
            res.json({
                success: true,
                message: 'Victim deleted successfully'
            });
        } catch (error) {
            res.status(error.message === 'Victim not found' ? 404 : 500).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = new VictimaController(); 