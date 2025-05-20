import express from 'express';
import compraController from '../controllers/compras.js';
const route = express.Router();


route.post('/create', compraController.create);
route.get('/getAll', compraController.getAll);

export default route;
