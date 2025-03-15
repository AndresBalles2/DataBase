import express from 'express';
import productController from '../controllers/productos.js';

const router = express.Router();

// Crear un nuevo producto
router.post('/create', productController.create);

// Obtener todos los productos
router.get('/getAll', productController.getAll);

// Obtener un producto por ID
router.get('/:id', productController.getOne);

// Actualizar un producto por ID
router.put('/:id', productController.update);

// Eliminar un producto por ID
router.delete('/:id', productController.delete);

export default router;