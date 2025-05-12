import productsModel from '../models/products.js';

class ProductController {
    constructor() {}

    // Crear un producto
    async create(req, res) {
        try {
            const { nombre, descripcion, precio, stock, categoria, imagen } = req.body;
            
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


    async update(req, res) {
        try {
            const { id } = req.params; // Cambiar de nombre a id
            const productoActualizado = await productsModel.update(id, req.body);
            if (!productoActualizado) {
                return res.status(404).json({ error: "Producto no encontrado" });
            }
            res.status(200).json(productoActualizado);
        } catch (e) {
            res.status(500).json({ error: "Error al actualizar el producto", detalles: e.message });
        }
    }
    async getOne(req, res) {
        try {
            const { id } = req.params;
            const producto = await productsModel.getOneById(id); // Usar getOneById en lugar de getOne
            if (!producto) {
                return res.status(404).json({ error: "Producto no encontrado" });
            }
            res.status(200).json(producto);
        } catch (e) {
            res.status(500).json({ error: "Error al obtener el producto", detalles: e.message });
        }
    }

    // Eliminar un producto por ID
    async delete(req, res) {
        try {
            const { id } = req.params;
            console.log('ID recibido para eliminar:', id); 
            const productoEliminado = await productsModel.delete(id);
            
            if (!productoEliminado) {
                console.log('Producto no encontrado'); 
                return res.status(404).json({ error: "Producto no encontrado" });
            }
            
            console.log('Producto eliminado con éxito'); 
            res.status(204).send(); // Confirmación sin contenido
        } catch (e) {
            console.error('Error al eliminar producto:', e); 
            res.status(500).json({ error: "Error al eliminar el producto", detalles: e.message });
        }
    }

    async productosAgrupados( req, res){
        try{
            const productosAgrupados= await productsModel.groupByCategory();
            res.status(200).json(productosAgrupados);
        }catch(e){
            res.status(500).json({error:"errorrrr", deatalles:e.message});
        }
    } 
    
    async getProductosProyectados(req, res) {
        try {
            const productos = await productsModel.getProductosProyectados();
            res.status(200).json(productos);
        } catch (error) {
            console.error("Error en getProductosProyectados:", error);
            res.status(500).json({ error: "Error al obtener productos", detalles: error.message });
        }
    }

    async filtrarProductosPorCategoria(req, res) {
        try {
            const categoria = req.params.categoria;
            console.log('controlador',categoria)
            const productos = await productsModel.filtrarPorCategoria({ categoria }); 
            res.status(200).json(productos);
        } catch (error) {
            res.status(500).json({ error: "Error al filtrar productos", detalles: error.message });
        }
    }
};
     
    


export default new ProductController();
