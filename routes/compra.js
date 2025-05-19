import express from 'express';
import compraController from '../controllers/compras';
const route = express.Router();


route.post('/compras', compraController.registrarCompra);
route.get('/compras', compraController.obtenerCompras);

module.exports = router;
