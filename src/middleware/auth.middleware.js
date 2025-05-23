const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.token || req.headers['x-access-token'] || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(403).json({
            success: false,
            message: 'A token is required for authentication'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: 'Invalid Token'
        });
    }
};

module.exports = verifyToken; 