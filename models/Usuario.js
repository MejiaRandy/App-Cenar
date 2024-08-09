const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Usuario = sequelize.define('Usuario', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    nombre_usuario: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rol: {
        type: DataTypes.ENUM('cliente', 'delivery', 'comercio', 'administrador'),
        allowNull: false,
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    foto_perfil: {
        type: DataTypes.STRING,
    },
}, {
    timestamps: true,
    tableName: 'usuarios'
});

module.exports = Usuario;
