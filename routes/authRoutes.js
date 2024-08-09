const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rutas para el registro
router.get('/register', authController.renderRegister);
router.post('/register', authController.register);

// Rutas para el login
router.get('/login', authController.renderLogin);
router.post('/login', authController.login);

// Ruta para el logout
router.get('/logout', authController.logout);

module.exports = router;
