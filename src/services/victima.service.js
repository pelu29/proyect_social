const Victima = require('../models/Victima.model');
const pool = require('../config/database');

class VictimaService {
    async getAllVictimas() {
        try {
            return await Victima.findAll(pool);
        } catch (error) {
            throw new Error(`Error getting victims: ${error.message}`);
        }
    }

    async getVictimaById(id) {
        try {
            const victima = await Victima.findById(pool, id);
            if (!victima) {
                throw new Error('Victim not found');
            }
            return victima;
        } catch (error) {
            throw new Error(`Error getting victim: ${error.message}`);
        }
    }

    async createVictima(victimaData) {
        try {
            const victima = new Victima(victimaData);
            return await victima.save(pool);
        } catch (error) {
            throw new Error(`Error creating victim: ${error.message}`);
        }
    }

    async updateVictima(id, victimaData) {
        try {
            const existingVictima = await Victima.findById(pool, id);
            if (!existingVictima) {
                throw new Error('Victim not found');
            }

            const updatedVictima = new Victima({
                ...victimaData,
                id_victima: id
            });

            return await updatedVictima.save(pool);
        } catch (error) {
            throw new Error(`Error updating victim: ${error.message}`);
        }
    }

    async deleteVictima(id) {
        try {
            const victima = await Victima.findById(pool, id);
            if (!victima) {
                throw new Error('Victim not found');
            }
            return await victima.delete(pool);
        } catch (error) {
            throw new Error(`Error deleting victim: ${error.message}`);
        }
    }
}

module.exports = new VictimaService(); 