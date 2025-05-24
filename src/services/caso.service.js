const Caso = require('../models/Caso.model');
const pool = require('../config/database');

class CasoService {
    async getAllCasos() {
        try {
            return await Caso.findAll(pool);
        } catch (error) {
            throw new Error(`Error getting casos: ${error.message}`);
        }
    }

    async getCasoById(id) {
        try {
            const caso = await Caso.findById(pool, id);
            if (!caso) {
                throw new Error('Caso not found');
            }
            return caso;
        } catch (error) {
            throw new Error(`Error getting caso: ${error.message}`);
        }
    }

    async getCasosByVictimaId(victimaId) {
        try {
            return await Caso.findByVictimaId(pool, victimaId);
        } catch (error) {
            throw new Error(`Error getting casos by victima id: ${error.message}`);
        }
    }

    async getCasosByAgresorId(agresorId) {
        try {
            return await Caso.findByAgresorId(pool, agresorId);
        } catch (error) {
            throw new Error(`Error getting casos by agresor id: ${error.message}`);
        }
    }

    async createCaso(casoData) {
        try {
            const caso = new Caso(casoData);
            return await caso.save(pool);
        } catch (error) {
            throw new Error(`Error creating caso: ${error.message}`);
        }
    }

    async updateCaso(id, casoData) {
        try {
            const existingCaso = await Caso.findById(pool, id);
            if (!existingCaso) {
                throw new Error('Caso not found');
            }

            const updatedCaso = new Caso({
                ...casoData,
                id_caso: id
            });

            return await updatedCaso.save(pool);
        } catch (error) {
            throw new Error(`Error updating caso: ${error.message}`);
        }
    }

    async deleteCaso(id) {
        try {
            const caso = await Caso.findById(pool, id);
            if (!caso) {
                throw new Error('Caso not found');
            }
            return await caso.delete(pool);
        } catch (error) {
            throw new Error(`Error deleting caso: ${error.message}`);
        }
    }
}

module.exports = new CasoService(); 