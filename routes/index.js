const express = require('express');
const router = express.Router();

// Incluir las rutas de autenticación
router.use('/', require('./authRoutes'));

// Incluir las rutas de categorías
router.use('/categorias', require('./categoriaRoutes'));

// Incluir las rutas de productos
router.use('/productos', require('./productoRoutes'));

// Ruta principal (puede redirigir a login si no está autenticado)
router.get('/', (req, res) => {
    res.redirect('/login');
});

module.exports = router;
