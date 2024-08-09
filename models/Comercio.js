const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const TipoComercio = require('./TipoComercio');

const Comercio = sequelize.define('Comercio', {
    nombre_comercio: {
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
    logo_comercio: {
        type: DataTypes.STRING,
    },
    hora_apertura: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    hora_cierre: {
        type: DataTypes.TIME,
        allowNull: false,
    },
}, {
    timestamps: true,
    tableName: 'comercios'
});

Comercio.belongsTo(TipoComercio, {
    foreignKey: 'tipo_comercio_id',
    as: 'tipoComercio'
});

module.exports = Comercio;
