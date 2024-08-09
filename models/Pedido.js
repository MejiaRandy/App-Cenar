const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const Usuario = require('./Usuario');
const Comercio = require('./Comercio');
const Direccion = require('./Direccion');

const Pedido = sequelize.define('Pedido', {
    estado: {
        type: DataTypes.ENUM('pendiente', 'en_proceso', 'completado'),
        allowNull: false,
        defaultValue: 'pendiente',
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    itbis: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    fecha_hora: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: true,
    tableName: 'pedidos'
});

Pedido.belongsTo(Usuario, {
    foreignKey: 'cliente_id',
    as: 'cliente'
});

Pedido.belongsTo(Comercio, {
    foreignKey: 'comercio_id',
    as: 'comercio'
});

Pedido.belongsTo(Direccion, {
    foreignKey: 'direccion_id',
    as: 'direccion'
});

Pedido.belongsTo(Usuario, {
    foreignKey: 'delivery_id',
    as: 'delivery'
});

module.exports = Pedido;
