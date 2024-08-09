const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');

// Renderizar página de registro
exports.renderRegister = (req, res) => {
    res.render('register');
};

// Registrar un nuevo usuario
exports.register = async (req, res) => {
    const { nombre, apellido, telefono, correo, nombre_usuario, contrasena, rol } = req.body;
    try {
        // Validar que el usuario no existe
        const usuarioExistente = await Usuario.findOne({ where: { correo } });
        if (usuarioExistente) {
            return res.status(400).send('El correo ya está registrado.');
        }

        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        // Crear nuevo usuario
        await Usuario.create({
            nombre,
            apellido,
            telefono,
            correo,
            nombre_usuario,
            contrasena: hashedPassword,
            rol,
        });

        res.redirect('/login');
    } catch (error) {
        res.status(500).send('Error al registrar el usuario.');
    }
};

// Renderizar página de login
exports.renderLogin = (req, res) => {
    res.render('login');
};

// Autenticar usuario
exports.login = async (req, res) => {
    const { correo, contrasena } = req.body;
    try {
        // Verificar si el usuario existe
        const usuario = await Usuario.findOne({ where: { correo } });
        if (!usuario) {
            return res.status(400).send('Correo o contraseña incorrectos.');
        }

        // Verificar contraseña
        const isMatch = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!isMatch) {
            return res.status(400).send('Correo o contraseña incorrectos.');
        }

        // Iniciar sesión
        req.session.usuarioId = usuario.id; // Asegúrate de que esto esté asignando correctamente el ID
        req.session.rol = usuario.rol;

        // Redirigir según el rol
        switch (usuario.rol) {
            case 'cliente':
                return res.redirect('/cliente/home');
            case 'delivery':
                return res.redirect('/delivery/home');
            case 'comercio':
                return res.redirect('/categorias'); // Redirigir al área de categorías para un comercio
            case 'administrador':
                return res.redirect('/admin/dashboard');
            default:
                return res.redirect('/login');
        }
    } catch (error) {
        res.status(500).send('Error al iniciar sesión.');
    }
};


// Cerrar sesión
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error al cerrar sesión.');
        }
        res.redirect('/login');
    });
};
