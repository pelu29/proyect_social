const User = require('../models/User.model');
const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthService {
    async register(userData) {
        try {
            // Hash the password before saving
            const hashedPassword = await bcrypt.hash(userData.password, 10); // 10 rounds of hashing
            
            const user = new User({
                email: userData.email,
                password: hashedPassword,
                id_victima: userData.id_victima, // Optional
                role: userData.role || 'victim' // Assign a default role, e.g., 'victim'
            });

            await user.save(pool);
            
            // Generate a token upon registration
            const token = jwt.sign(
                { user_id: user.id_usuario, email: user.email, role: user.role }, // Include role in token payload
                process.env.JWT_SECRET || 'your-secret-key', // Use environment variable for secret
                { expiresIn: '2h' } // Token expiration time
            );

            return { user, token };
        } catch (error) {
            throw new Error(`Error registering user: ${error.message}`);
        }
    }

    async login(email, password) {
        try {
            const user = await User.findByEmail(pool, email);
            if (!user) {
                throw new Error('Invalid Credentials');
            }

            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                throw new Error('Invalid Credentials');
            }

            // Generate JWT upon successful login
            const token = jwt.sign(
                { user_id: user.id_usuario, email: user.email, role: user.role }, // Include role in token payload
                process.env.JWT_SECRET || 'your-secret-key', // Use environment variable for secret
                { expiresIn: '2h' } // Token expiration time
            );

            return { user, token };
        } catch (error) {
            throw new Error(`Error logging in: ${error.message}`);
        }
    }
    
    // Method to verify token (could be used by middleware)
    verifyToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        } catch (error) {
            throw new Error('Invalid or expired token');
        }
    }
}

module.exports = new AuthService(); 