const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

// Rutas para la gestión de categorías
router.get('/', categoriaController.listarCategorias);
router.get('/crear', categoriaController.mostrarFormularioCrear);
router.post('/crear', categoriaController.crearCategoria);
router.get('/editar/:id', categoriaController.mostrarFormularioEditar);
router.post('/editar/:id', categoriaController.editarCategoria);
router.post('/eliminar/:id', categoriaController.eliminarCategoria);

module.exports = router;
