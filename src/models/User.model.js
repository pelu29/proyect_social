const pool = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
    constructor(data) {
        this.id_usuario = data.id_usuario;
        this.email = data.email;
        this.password = data.password; // Should be hashed password
        this.id_victima = data.id_victima || null; // Optional link to Victima
        this.role = data.role; // Added role field
    }

    static async findByEmail(pool, email) {
        try {
            const [rows] = await pool.query('SELECT * FROM Usuarios WHERE email = ?', [email]);
            return rows.length ? new User(rows[0]) : null;
        } catch (error) {
            throw error;
        }
    }

    static async findById(pool, id) {
        try {
            const [rows] = await pool.query('SELECT * FROM Usuarios WHERE id_usuario = ?', [id]);
            return rows.length ? new User(rows[0]) : null;
        } catch (error) {
            throw error;
        }
    }

    async save(pool) {
        try {
            // Password should be hashed before calling save if it's a new user
            // For updates, handle password hashing carefully (only if password is being changed)
            const [result] = await pool.query(
                'INSERT INTO Usuarios (email, password, id_victima, role) VALUES (?, ?, ?, ?)',
                [this.email, this.password, this.id_victima, this.role]
            );
            this.id_usuario = result.insertId;
            return this;
        } catch (error) {
            throw error;
        }
    }

    // Method to compare provided password with stored hashed password
    async comparePassword(candidatePassword) {
        return await bcrypt.compare(candidatePassword, this.password);
    }
}

module.exports = User; 