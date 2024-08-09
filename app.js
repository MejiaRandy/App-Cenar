const express = require('express');
const session = require('express-session');
const sequelize = require('./config/config');
const path = require('path');

// Importar modelos
const Usuario = require('./models/Usuario');
const Comercio = require('./models/Comercio');
const TipoComercio = require('./models/TipoComercio');
const Categoria = require('./models/Categoria');
const Producto = require('./models/Producto');
const Direccion = require('./models/Direccion');
const Pedido = require('./models/Pedido');

const app = express();

// Configurar sesiones
app.use(session({
  secret: 'appcenar_secret',
  resave: false,
  saveUninitialized: true,
}));

// Configurar body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configurar directorio público
app.use(express.static(path.join(__dirname, 'public')));

// Configurar rutas
app.use('/', require('./routes/index'));

// Configurar vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  try {
    // Autenticar conexión con la base de datos
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida.');
    
    // Sincronizar los modelos con la base de datos
    await sequelize.sync();  // Sin `force: true` para no eliminar datos existentes
    console.log('Modelos sincronizados con la base de datos.');

    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
});