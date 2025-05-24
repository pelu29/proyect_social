class Seguimiento {
    constructor(data) {
        this.id_seguimiento = data.id_seguimiento;
        this.id_caso = data.id_caso;
        this.fecha = data.fecha;
        this.observaciones = data.observaciones;
        this.profesional_encargado = data.profesional_encargado;
    }

    static async findAll(pool) {
        try {
            const [rows] = await pool.query('SELECT * FROM Seguimientos');
            return rows.map(row => new Seguimiento(row));
        } catch (error) {
            throw error;
        }
    }

    static async findById(pool, id) {
        try {
            const [rows] = await pool.query('SELECT * FROM Seguimientos WHERE id_seguimiento = ?', [id]);
            return rows.length ? new Seguimiento(rows[0]) : null;
        } catch (error) {
            throw error;
        }
    }

    static async findByCasoId(pool, casoId) {
        try {
            const [rows] = await pool.query('SELECT * FROM Seguimientos WHERE id_caso = ?', [casoId]);
            return rows.map(row => new Seguimiento(row));
        } catch (error) {
            throw error;
        }
    }

    async save(pool) {
        try {
            if (this.id_seguimiento) {
                // Update
                await pool.query(
                    'UPDATE Seguimientos SET id_caso = ?, fecha = ?, observaciones = ?, profesional_encargado = ? WHERE id_seguimiento = ?',
                    [this.id_caso, this.fecha, this.observaciones, this.profesional_encargado, this.id_seguimiento]
                );
                return this;
            } else {
                // Insert
                const [result] = await pool.query(
                    'INSERT INTO Seguimientos (id_caso, fecha, observaciones, profesional_encargado) VALUES (?, ?, ?, ?, ?)',
                    [this.id_caso, this.fecha, this.observaciones, this.profesional_encargado]
                );
                this.id_seguimiento = result.insertId;
                return this;
            }
        } catch (error) {
            throw error;
        }
    }

    async delete(pool) {
        try {
            await pool.query('DELETE FROM Seguimientos WHERE id_seguimiento = ?', [this.id_seguimiento]);
            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Seguimiento; 