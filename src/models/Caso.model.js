class Caso {
    constructor(data) {
        this.id_caso = data.id_caso;
        this.id_victima = data.id_victima;
        this.id_agresor = data.id_agresor;
        this.fecha_denuncia = data.fecha_denuncia;
        this.tipo_de_violencia = data.tipo_de_violencia;
        this.estado = data.estado;
    }

    static async findAll(pool) {
        try {
            const [rows] = await pool.query('SELECT * FROM Casos');
            return rows.map(row => new Caso(row));
        } catch (error) {
            throw error;
        }
    }

    static async findById(pool, id) {
        try {
            const [rows] = await pool.query('SELECT * FROM Casos WHERE id_caso = ?', [id]);
            return rows.length ? new Caso(rows[0]) : null;
        } catch (error) {
            throw error;
        }
    }
    
    static async findByVictimaId(pool, victimaId) {
        try {
            const [rows] = await pool.query('SELECT * FROM Casos WHERE id_victima = ?', [victimaId]);
            return rows.map(row => new Caso(row));
        } catch (error) {
            throw error;
        }
    }

    static async findByAgresorId(pool, agresorId) {
        try {
            const [rows] = await pool.query('SELECT * FROM Casos WHERE id_agresor = ?', [agresorId]);
            return rows.map(row => new Caso(row));
        } catch (error) {
            throw error;
        }
    }

    async save(pool) {
        try {
            if (this.id_caso) {
                // Update
                await pool.query(
                    'UPDATE Casos SET id_victima = ?, id_agresor = ?, fecha_denuncia = ?, tipo_de_violencia = ?, estado = ? WHERE id_caso = ?',
                    [this.id_victima, this.id_agresor, this.fecha_denuncia, this.tipo_de_violencia, this.estado, this.id_caso]
                );
                return this;
            } else {
                // Insert
                const [result] = await pool.query(
                    'INSERT INTO Casos (id_victima, id_agresor, fecha_denuncia, tipo_de_violencia, estado) VALUES (?, ?, ?, ?, ?)',
                    [this.id_victima, this.id_agresor, this.fecha_denuncia, this.tipo_de_violencia, this.estado]
                );
                this.id_caso = result.insertId;
                return this;
            }
        } catch (error) {
            throw error;
        }
    }

    async delete(pool) {
        try {
            await pool.query('DELETE FROM Casos WHERE id_caso = ?', [this.id_caso]);
            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Caso; 