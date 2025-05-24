const authService = require('../services/auth.service');

class AuthController {
    async register(req, res) {
        try {
            const { email, password, id_victima } = req.body;

            // Basic validation
            if (!(email && password)) {
                return res.status(400).json({ success: false, message: 'Email and password are required' });
            }

            const { user, token } = await authService.register({ email, password, id_victima });

            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: { user, token }
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            
            // Basic validation
            if (!(email && password)) {
                return res.status(400).json({ success: false, message: 'Email and password are required' });
            }

            const { user, token } = await authService.login(email, password);

            res.json({
                success: true,
                message: 'Login successful',
                data: { user, token }
            });
        } catch (error) {
             res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = new AuthController(); 