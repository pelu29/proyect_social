class Victima {
    constructor(data) {
        this.id_victima = data.id_victima;
        this.nombre = data.nombre;
        this.edad = data.edad;
        this.sexo = data.sexo;
        this.direccion = data.direccion;
        this.contacto = data.contacto;
        this.tipo_de_documento = data.tipo_de_documento;
        this.numero_documento = data.numero_documento;
    }

    static async findAll(pool) {
        try {
            const [rows] = await pool.query('SELECT * FROM Victimas');
            return rows.map(row => new Victima(row));
        } catch (error) {
            throw error;
        }
    }

    static async findById(pool, id) {
        try {
            const [rows] = await pool.query('SELECT * FROM Victimas WHERE id_victima = ?', [id]);
            return rows.length ? new Victima(rows[0]) : null;
        } catch (error) {
            throw error;
        }
    }

    async save(pool) {
        try {
            if (this.id_victima) {
                // Update
                await pool.query(
                    'UPDATE Victimas SET nombre = ?, edad = ?, sexo = ?, direccion = ?, contacto = ?, tipo_de_documento = ?, numero_documento = ? WHERE id_victima = ?',
                    [this.nombre, this.edad, this.sexo, this.direccion, this.contacto, this.tipo_de_documento, this.numero_documento, this.id_victima]
                );
                return this;
            } else {
                // Insert
                const [result] = await pool.query(
                    'INSERT INTO Victimas (nombre, edad, sexo, direccion, contacto, tipo_de_documento, numero_documento) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [this.nombre, this.edad, this.sexo, this.direccion, this.contacto, this.tipo_de_documento, this.numero_documento]
                );
                this.id_victima = result.insertId;
                return this;
            }
        } catch (error) {
            throw error;
        }
    }

    async delete(pool) {
        try {
            await pool.query('DELETE FROM Victimas WHERE id_victima = ?', [this.id_victima]);
            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Victima; 