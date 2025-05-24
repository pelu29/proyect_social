const Denuncia = require('../models/Denuncia.model');
const pool = require('../config/database');

class DenunciaService {
    async getAllDenuncias() {
        try {
            return await Denuncia.findAll(pool);
        } catch (error) {
            throw new Error(`Error getting denuncias: ${error.message}`);
        }
    }

    async getDenunciaById(id) {
        try {
            const denuncia = await Denuncia.findById(pool, id);
            if (!denuncia) {
                throw new Error('Denuncia not found');
            }
            return denuncia;
        } catch (error) {
            throw new Error(`Error getting denuncia: ${error.message}`);
        }
    }

    async getDenunciasByCasoId(casoId) {
        try {
            return await Denuncia.findByCasoId(pool, casoId);
        } catch (error) {
            throw new Error(`Error getting denuncias by caso id: ${error.message}`);
        }
    }

    async createDenuncia(denunciaData) {
        try {
            const denuncia = new Denuncia(denunciaData);
            return await denuncia.save(pool);
        } catch (error) {
            throw new Error(`Error creating denuncia: ${error.message}`);
        }
    }

    async updateDenuncia(id, denunciaData) {
        try {
            const existingDenuncia = await Denuncia.findById(pool, id);
            if (!existingDenuncia) {
                throw new Error('Denuncia not found');
            }

            const updatedDenuncia = new Denuncia({
                ...denunciaData,
                id_denuncia: id
            });

            return await updatedDenuncia.save(pool);
        } catch (error) {
            throw new Error(`Error updating denuncia: ${error.message}`);
        }
    }

    async deleteDenuncia(id) {
        try {
            const denuncia = await Denuncia.findById(pool, id);
            if (!denuncia) {
                throw new Error('Denuncia not found');
            }
            return await denuncia.delete(pool);
        } catch (error) {
            throw new Error(`Error deleting denuncia: ${error.message}`);
        }
    }
}

module.exports = new DenunciaService(); 