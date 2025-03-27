import productsModel from '../models/products.js';

class ProductController {
    constructor() {}

    // Crear un producto
    async create(req, res) {
        try {
            const { nombre, descripcion, precio, stock, categoria, imagen } = req.body;
            
            // const productexist= await productsModel.findone({})
            // Validar que todos los campos requeridos estén presentes
            if (!nombre || !descripcion || !precio || !stock ) {
                return res.status(400).json({ error: "Todos los campos son obligatorios" });
            }
    
            const nuevoProducto = await  productsModel.create({ nombre, descripcion, precio, stock, categoria, imagen });
            res.status(201).json(nuevoProducto);
        } catch (error) {
            console.error("Error al crear producto:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
    

    // Obtener todos los productos
    async getAll(req, res) {
        try {
            const productos = await productsModel.getAll();
            res.status(200).json(productos);
        } catch (e) {
            res.status(500).json({ error: "Error al obtener los productos", detalles: e.message });
        }
    }

    // Obtener un producto por ID
    async getOne(req, res) {
        try {
            const { id } = req.params;
            const producto = await productsModel.getOne(id);
            if (!producto) {
                return res.status(404).json({ error: "Producto no encontrado" });
            }
            res.status(200).json(producto);
        } catch (e) {
            res.status(500).json({ error: "Error al obtener el producto", detalles: e.message });
        }
    }

    // Actualizar un producto por ID
    async update(req, res) {
        try {
            const { nombre } = req.params;
            const productoActualizado = await productsModel.update(nombre, req.body);
            if (!productoActualizado) {
                return res.status(404).json({ error: "Producto no encontrado" });
            }
            res.status(200).json(productoActualizado);
        } catch (e) {
            res.status(500).json({ error: "Error al actualizar el producto", detalles: e.message });
        }
    }

    // Eliminar un producto por ID
    async delete(req, res) {
        try {
            const { nombre } = req.params;
            const productoEliminado = await productsModel.delete(nombre);
            if (!productoEliminado) {
                return res.status(404).json({ error: "Producto no encontrado" });
            }
            res.status(204).send(); // No retorna contenido, solo confirma la eliminación
        } catch (e) {
            res.status(500).json({ error: "Error al eliminar el producto", detalles: e.message });
        }
    }
}

export default new ProductController();
