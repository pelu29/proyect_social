const Recurso = require('../models/Recurso.model');
const pool = require('../config/database');

class RecursoService {
    async getAllRecursos() {
        try {
            return await Recurso.findAll(pool);
        } catch (error) {
            throw new Error(`Error getting recursos: ${error.message}`);
        }
    }

    async getRecursoById(id) {
        try {
            const recurso = await Recurso.findById(pool, id);
            if (!recurso) {
                throw new Error('Recurso not found');
            }
            return recurso;
        } catch (error) {
            throw new Error(`Error getting recurso: ${error.message}`);
        }
    }

    async getRecursosByCasoId(casoId) {
        try {
            return await Recurso.findByCasoId(pool, casoId);
        } catch (error) {
            throw new Error(`Error getting recursos by caso id: ${error.message}`);
        }
    }

    async createRecurso(recursoData) {
        try {
            const recurso = new Recurso(recursoData);
            return await recurso.save(pool);
        } catch (error) {
            throw new Error(`Error creating recurso: ${error.message}`);
        }
    }

    async updateRecurso(id, recursoData) {
        try {
            const existingRecurso = await Recurso.findById(pool, id);
            if (!existingRecurso) {
                throw new Error('Recurso not found');
            }

            const updatedRecurso = new Recurso({
                ...recursoData,
                id_recurso: id
            });

            return await updatedRecurso.save(pool);
        } catch (error) {
            throw new Error(`Error updating recurso: ${error.message}`);
        }
    }

    async deleteRecurso(id) {
        try {
            const recurso = await Recurso.findById(pool, id);
            if (!recurso) {
                throw new Error('Recurso not found');
            }
            return await recurso.delete(pool);
        } catch (error) {
            throw new Error(`Error deleting recurso: ${error.message}`);
        }
    }
}

module.exports = new RecursoService(); 