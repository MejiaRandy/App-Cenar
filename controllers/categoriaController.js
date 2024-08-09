const Categoria = require('../models/Categoria');
const Comercio = require('../models/Comercio');

// Mostrar todas las categorías de un comercio
exports.listarCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.findAll({
            where: { comercio_id: req.session.usuarioId }, // Asegúrate de que req.session.usuarioId esté definido
            include: { model: Comercio, as: 'comercio' }
        });
        res.render('categorias/list', { categorias });
    } catch (error) {
        console.error("Error al listar las categorías:", error); // Loguea el error para más detalles
        res.status(500).send('Error al listar las categorías.');
    }
};


// Mostrar formulario para crear una categoría
exports.mostrarFormularioCrear = (req, res) => {
    res.render('categorias/create');
};

// Crear una nueva categoría
exports.crearCategoria = async (req, res) => {
    const { nombre_categoria, descripcion } = req.body;
    try {
        const comercio = await Comercio.findByPk(req.session.usuarioId);
        if (!comercio) {
            return res.status(400).send('Primero debes crear un comercio.');
        }

        await Categoria.create({
            nombre_categoria,
            descripcion,
            comercio_id: req.session.usuarioId
        });

        res.redirect('/categorias');
    } catch (error) {
        console.error("Error al crear la categoría:", error);
        res.status(500).send('Error al crear la categoría.');
    }
};

// Mostrar formulario para editar una categoría
exports.mostrarFormularioEditar = async (req, res) => {
    try {
        const categoria = await Categoria.findByPk(req.params.id);
        if (!categoria) {
            return res.status(404).send('Categoría no encontrada.');
        }
        res.render('categorias/edit', { categoria });
    } catch (error) {
        console.error("Error al cargar la categoría:", error);
        res.status(500).send('Error al cargar la categoría.');
    }
};


// Editar una categoría
exports.editarCategoria = async (req, res) => {
    const { nombre_categoria, descripcion } = req.body;
    try {
        await Categoria.update(
            { nombre_categoria, descripcion },
            { where: { id: req.params.id, comercio_id: req.session.usuarioId } }
        );
        res.redirect('/categorias');
    } catch (error) {
        res.status(500).send('Error al editar la categoría.');
    }
};

// Eliminar una categoría
exports.eliminarCategoria = async (req, res) => {
    try {
        await Categoria.destroy({
            where: { id: req.params.id, comercio_id: req.session.usuarioId }
        });
        res.redirect('/categorias');
    } catch (error) {
        res.status(500).send('Error al eliminar la categoría.');
    }
};
