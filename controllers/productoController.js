const Producto = require('../models/Producto');
const Categoria = require('../models/Categoria');

// Mostrar todos los productos de una categoría
exports.listarProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll({
            where: { categoria_id: req.params.categoriaId },
            include: { model: Categoria, as: 'categoria' }
        });
        res.render('productos/list', { productos, categoriaId: req.params.categoriaId });
    } catch (error) {
        console.error("Error al listar los productos:", error);
        res.status(500).send('Error al listar los productos.');
    }
};

// Mostrar formulario para crear un producto
exports.mostrarFormularioCrear = (req, res) => {
    res.render('productos/create', { categoriaId: req.params.categoriaId });
};

// Crear un nuevo producto
exports.crearProducto = async (req, res) => {
    const { nombre_producto, descripcion, precio } = req.body;
    const categoriaId = req.params.categoriaId;  // Capturar categoriaId correctamente

    try {
        await Producto.create({
            nombre_producto,
            descripcion,
            precio,
            categoria_id: categoriaId  // Usar el categoriaId capturado
        });
        res.redirect(`/productos/${categoriaId}`);
    } catch (error) {
        console.error("Error al crear el producto:", error);
        res.status(500).send('Error al crear el producto.');
    }
};


// Mostrar formulario para editar un producto
exports.mostrarFormularioEditar = async (req, res) => {
    try {
        const producto = await Producto.findByPk(req.params.id);
        res.render('productos/edit', { producto, categoriaId: req.params.categoriaId });
    } catch (error) {
        console.error("Error al cargar el producto:", error);
        res.status(500).send('Error al cargar el producto.');
    }
};

// Editar un producto
exports.editarProducto = async (req, res) => {
    const { nombre_producto, descripcion, precio } = req.body;
    try {
        await Producto.update(
            { nombre_producto, descripcion, precio },
            { where: { id: req.params.id, categoria_id: req.params.categoriaId } }
        );
        res.redirect(`/productos/${req.params.categoriaId}`);
    } catch (error) {
        console.error("Error al editar el producto:", error);
        res.status(500).send('Error al editar el producto.');
    }
};

// Eliminar un producto
exports.eliminarProducto = async (req, res) => {
    try {
        await Producto.destroy({
            where: { id: req.params.id, categoria_id: req.params.categoriaId }
        });
        res.redirect(`/productos/${req.params.categoriaId}`);
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).send('Error al eliminar el producto.');
    }
};