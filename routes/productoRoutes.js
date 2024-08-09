const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// Rutas para la gestión de productos
router.get('/:categoriaId', productoController.listarProductos);
router.get('/:categoriaId/crear', productoController.mostrarFormularioCrear);
router.post('/:categoriaId/crear', productoController.crearProducto);
router.get('/:categoriaId/editar/:id', productoController.mostrarFormularioEditar);
router.post('/:categoriaId/editar/:id', productoController.editarProducto);
router.post('/:categoriaId/eliminar/:id', productoController.eliminarProducto);

module.exports = router;