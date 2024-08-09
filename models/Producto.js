const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const Categoria = require('./Categoria');

const Producto = sequelize.define('Producto', {
    nombre_producto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    foto_producto: {
        type: DataTypes.STRING,
    },
}, {
    timestamps: true,
    tableName: 'productos'
});

Producto.belongsTo(Categoria, {
    foreignKey: 'categoria_id',
    as: 'categoria'
});

module.exports = Producto;