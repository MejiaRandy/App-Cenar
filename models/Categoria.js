const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const Comercio = require('./Comercio');

const Categoria = sequelize.define('Categoria', {
    nombre_categoria: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
    },
    comercio_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Comercio,
            key: 'id'
        },
        allowNull: false,
    }
}, {
    timestamps: true,
    tableName: 'categorias'
});


Categoria.belongsTo(Comercio, {
    foreignKey: 'comercio_id',
    as: 'comercio'
});

module.exports = Categoria;
