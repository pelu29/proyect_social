const Seguimiento = require('../models/Seguimiento.model');
const pool = require('../config/database');

class SeguimientoService {
    async getAllSeguimientos() {
        try {
            return await Seguimiento.findAll(pool);
        } catch (error) {
            throw new Error(`Error getting seguimientos: ${error.message}`);
        }
    }

    async getSeguimientoById(id) {
        try {
            const seguimiento = await Seguimiento.findById(pool, id);
            if (!seguimiento) {
                throw new Error('Seguimiento not found');
            }
            return seguimiento;
        } catch (error) {
            throw new Error(`Error getting seguimiento: ${error.message}`);
        }
    }

    async getSeguimientosByCasoId(casoId) {
        try {
            return await Seguimiento.findByCasoId(pool, casoId);
        } catch (error) {
            throw new Error(`Error getting seguimientos by caso id: ${error.message}`);
        }
    }

    async createSeguimiento(seguimientoData) {
        try {
            const seguimiento = new Seguimiento(seguimientoData);
            return await seguimiento.save(pool);
        } catch (error) {
            throw new Error(`Error creating seguimiento: ${error.message}`);
        }
    }

    async updateSeguimiento(id, seguimientoData) {
        try {
            const existingSeguimiento = await Seguimiento.findById(pool, id);
            if (!existingSeguimiento) {
                throw new Error('Seguimiento not found');
            }

            const updatedSeguimiento = new Seguimiento({
                ...seguimientoData,
                id_seguimiento: id
            });

            return await updatedSeguimiento.save(pool);
        } catch (error) {
            throw new Error(`Error updating seguimiento: ${error.message}`);
        }
    }

    async deleteSeguimiento(id) {
        try {
            const seguimiento = await Seguimiento.findById(pool, id);
            if (!seguimiento) {
                throw new Error('Seguimiento not found');
            }
            return await seguimiento.delete(pool);
        } catch (error) {
            throw new Error(`Error deleting seguimiento: ${error.message}`);
        }
    }
}

module.exports = new SeguimientoService(); 