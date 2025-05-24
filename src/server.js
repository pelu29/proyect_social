const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
const victimRoutes = require('./routes/victima.routes');
const agresorRoutes = require('./routes/agresor.routes');
const casoRoutes = require('./routes/caso.routes');
const denunciaRoutes = require('./routes/denuncia.routes');
const seguimientoRoutes = require('./routes/seguimiento.routes');
const recursoRoutes = require('./routes/recurso.routes');
const authRoutes = require('./routes/auth.routes');

// Use routes
app.use('/api/victimas', victimRoutes);
app.use('/api/agresores', agresorRoutes);
app.use('/api/casos', casoRoutes);
app.use('/api/denuncias', denunciaRoutes);
app.use('/api/seguimientos', seguimientoRoutes);
app.use('/api/recursos', recursoRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: err.message
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 