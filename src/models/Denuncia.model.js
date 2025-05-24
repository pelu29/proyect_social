class Denuncia {
    constructor(data) {
        this.id_denuncia = data.id_denuncia;
        this.id_caso = data.id_caso;
        this.fecha = data.fecha;
        this.lugar_denuncia = data.lugar_denuncia;
        this.entidad_que_recibe = data.entidad_que_recibe;
        this.resultado_inicial = data.resultado_inicial;
    }

    static async findAll(pool) {
        try {
            const [rows] = await pool.query('SELECT * FROM Denuncias');
            return rows.map(row => new Denuncia(row));
        } catch (error) {
            throw error;
        }
    }

    static async findById(pool, id) {
        try {
            const [rows] = await pool.query('SELECT * FROM Denuncias WHERE id_denuncia = ?', [id]);
            return rows.length ? new Denuncia(rows[0]) : null;
        } catch (error) {
            throw error;
        }
    }

    static async findByCasoId(pool, casoId) {
        try {
            const [rows] = await pool.query('SELECT * FROM Denuncias WHERE id_caso = ?', [casoId]);
            return rows.map(row => new Denuncia(row));
        } catch (error) {
            throw error;
        }
    }

    async save(pool) {
        try {
            if (this.id_denuncia) {
                // Update
                await pool.query(
                    'UPDATE Denuncias SET id_caso = ?, fecha = ?, lugar_denuncia = ?, entidad_que_recibe = ?, resultado_inicial = ? WHERE id_denuncia = ?',
                    [this.id_caso, this.fecha, this.lugar_denuncia, this.entidad_que_recibe, this.resultado_inicial, this.id_denuncia]
                );
                return this;
            } else {
                // Insert
                const [result] = await pool.query(
                    'INSERT INTO Denuncias (id_caso, fecha, lugar_denuncia, entidad_que_recibe, resultado_inicial) VALUES (?, ?, ?, ?, ?)',
                    [this.id_caso, this.fecha, this.lugar_denuncia, this.entidad_que_recibe, this.resultado_inicial]
                );
                this.id_denuncia = result.insertId;
                return this;
            }
        } catch (error) {
            throw error;
        }
    }

    async delete(pool) {
        try {
            await pool.query('DELETE FROM Denuncias WHERE id_denuncia = ?', [this.id_denuncia]);
            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Denuncia; 