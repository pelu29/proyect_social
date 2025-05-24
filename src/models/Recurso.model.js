class Recurso {
    constructor(data) {
        this.id_recurso = data.id_recurso;
        this.id_caso = data.id_caso;
        this.tipo_recurso = data.tipo_recurso;
        this.fecha_inicio = data.fecha_inicio;
        this.fecha_fin = data.fecha_fin;
    }

    static async findAll(pool) {
        try {
            const [rows] = await pool.query('SELECT * FROM Recursos_Brindados');
            return rows.map(row => new Recurso(row));
        } catch (error) {
            throw error;
        }
    }

    static async findById(pool, id) {
        try {
            const [rows] = await pool.query('SELECT * FROM Recursos_Brindados WHERE id_recurso = ?', [id]);
            return rows.length ? new Recurso(rows[0]) : null;
        } catch (error) {
            throw error;
        }
    }

    static async findByCasoId(pool, casoId) {
        try {
            const [rows] = await pool.query('SELECT * FROM Recursos_Brindados WHERE id_caso = ?', [casoId]);
            return rows.map(row => new Recurso(row));
        } catch (error) {
            throw error;
        }
    }

    async save(pool) {
        try {
            if (this.id_recurso) {
                // Update
                await pool.query(
                    'UPDATE Recursos_Brindados SET id_caso = ?, tipo_recurso = ?, fecha_inicio = ?, fecha_fin = ? WHERE id_recurso = ?',
                    [this.id_caso, this.tipo_recurso, this.fecha_inicio, this.fecha_fin, this.id_recurso]
                );
                return this;
            } else {
                // Insert
                const [result] = await pool.query(
                    'INSERT INTO Recursos_Brindados (id_caso, tipo_recurso, fecha_inicio, fecha_fin) VALUES (?, ?, ?, ?)',
                    [this.id_caso, this.tipo_recurso, this.fecha_inicio, this.fecha_fin]
                );
                this.id_recurso = result.insertId;
                return this;
            }
        } catch (error) {
            throw error;
        }
    }

    async delete(pool) {
        try {
            await pool.query('DELETE FROM Recursos_Brindados WHERE id_recurso = ?', [this.id_recurso]);
            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Recurso; 