const denunciaService = require('../services/denuncia.service');

class DenunciaController {
    async getAllDenuncias(req, res) {
        try {
            const denuncias = await denunciaService.getAllDenuncias();
            res.json({
                success: true,
                data: denuncias
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async getDenunciaById(req, res) {
        try {
            const denuncia = await denunciaService.getDenunciaById(req.params.id);
            res.json({
                success: true,
                data: denuncia
            });
        } catch (error) {
            res.status(error.message === 'Denuncia not found' ? 404 : 500).json({
                success: false,
                message: error.message
            });
        }
    }

    async getDenunciasByCasoId(req, res) {
        try {
            const denuncias = await denunciaService.getDenunciasByCasoId(req.params.casoId);
            res.json({
                success: true,
                data: denuncias
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async createDenuncia(req, res) {
        try {
            const denuncia = await denunciaService.createDenuncia(req.body);
            res.status(201).json({
                success: true,
                data: denuncia
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async updateDenuncia(req, res) {
        try {
            const denuncia = await denunciaService.updateDenuncia(req.params.id, req.body);
            res.json({
                success: true,
                data: denuncia
            });
        } catch (error) {
            res.status(error.message === 'Denuncia not found' ? 404 : 400).json({
                success: false,
                message: error.message
            });
        }
    }

    async deleteDenuncia(req, res) {
        try {
            await denunciaService.deleteDenuncia(req.params.id);
            res.json({
                success: true,
                message: 'Denuncia deleted successfully'
            });
        } catch (error) {
            res.status(error.message === 'Denuncia not found' ? 404 : 500).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = new DenunciaController(); 