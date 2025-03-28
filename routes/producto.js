import express from 'express';
import productController from '../controllers/productos.js';

const route = express.Router();

// Crear un nuevo producto
route.post('/create', productController.create);

// Obtener todos los productos
route.get('/getAll', productController.getAll);

// Obtener un producto por ID
route.get('/:id', productController.getOne);

// Actualizar un producto por ID
route.put('/:id', productController.update);

// Eliminar un producto por ID
route.delete('/delete/:id', productController.delete);

export default route;