const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const TipoComercio = sequelize.define('TipoComercio', {
    nombre_tipo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
    },
    icono_tipo: {
        type: DataTypes.STRING,
    },
}, {
    timestamps: true,
    tableName: 'tipos_comercios'
});

module.exports = TipoComercio;