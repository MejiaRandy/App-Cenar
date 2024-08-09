const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const Usuario = require('./Usuario');

const Direccion = sequelize.define('Direccion', {
    nombre_direccion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    timestamps: true,
    tableName: 'direcciones'
});

Direccion.belongsTo(Usuario, {
    foreignKey: 'usuario_id',
    as: 'usuario'
});

module.exports = Direccion;
