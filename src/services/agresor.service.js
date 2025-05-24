const Agresor = require('../models/Agresor.model');
const pool = require('../config/database');

class AgresorService {
    async getAllAgresores() {
        try {
            return await Agresor.findAll(pool);
        } catch (error) {
            throw new Error(`Error getting agresores: ${error.message}`);
        }
    }

    async getAgresorById(id) {
        try {
            const agresor = await Agresor.findById(pool, id);
            if (!agresor) {
                throw new Error('Agresor not found');
            }
            return agresor;
        } catch (error) {
            throw new Error(`Error getting agresor: ${error.message}`);
        }
    }

    async createAgresor(agresorData) {
        try {
            const agresor = new Agresor(agresorData);
            return await agresor.save(pool);
        } catch (error) {
            throw new Error(`Error creating agresor: ${error.message}`);
        }
    }

    async updateAgresor(id, agresorData) {
        try {
            const existingAgresor = await Agresor.findById(pool, id);
            if (!existingAgresor) {
                throw new Error('Agresor not found');
            }

            const updatedAgresor = new Agresor({
                ...agresorData,
                id_agresor: id
            });

            return await updatedAgresor.save(pool);
        } catch (error) {
            throw new Error(`Error updating agresor: ${error.message}`);
        }
    }

    async deleteAgresor(id) {
        try {
            const agresor = await Agresor.findById(pool, id);
            if (!agresor) {
                throw new Error('Agresor not found');
            }
            return await agresor.delete(pool);
        } catch (error) {
            throw new Error(`Error deleting agresor: ${error.message}`);
        }
    }
}

module.exports = new AgresorService(); 