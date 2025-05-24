class Agresor {
    constructor(data) {
        this.id_agresor = data.id_agresor;
        this.nombre = data.nombre;
        this.edad = data.edad;
        this.sexo = data.sexo;
        this.vinculo_con_la_victima = data.vinculo_con_la_victima;
        this.antecedentes = data.antecedentes;
    }

    static async findAll(pool) {
        try {
            const [rows] = await pool.query('SELECT * FROM Agresores');
            return rows.map(row => new Agresor(row));
        } catch (error) {
            throw error;
        }
    }

    static async findById(pool, id) {
        try {
            const [rows] = await pool.query('SELECT * FROM Agresores WHERE id_agresor = ?', [id]);
            return rows.length ? new Agresor(rows[0]) : null;
        } catch (error) {
            throw error;
        }
    }

    async save(pool) {
        try {
            if (this.id_agresor) {
                // Update
                await pool.query(
                    'UPDATE Agresores SET nombre = ?, edad = ?, sexo = ?, vinculo_con_la_victima = ?, antecedentes = ? WHERE id_agresor = ?',
                    [this.nombre, this.edad, this.sexo, this.vinculo_con_la_victima, this.antecedentes, this.id_agresor]
                );
                return this;
            } else {
                // Insert
                const [result] = await pool.query(
                    'INSERT INTO Agresores (nombre, edad, sexo, vinculo_con_la_victima, antecedentes) VALUES (?, ?, ?, ?, ?)',
                    [this.nombre, this.edad, this.sexo, this.vinculo_con_la_victima, this.antecedentes]
                );
                this.id_agresor = result.insertId;
                return this;
            }
        } catch (error) {
            throw error;
        }
    }

    async delete(pool) {
        try {
            await pool.query('DELETE FROM Agresores WHERE id_agresor = ?', [this.id_agresor]);
            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Agresor; 