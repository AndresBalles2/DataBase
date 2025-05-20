import comprasModel from '../models/compra.js';

class CompraController {
    constructor() {}

    // Crear una compra
    async create(req, res) {
        try {
            const { usuarioId, nombreUsuario, productos } = req.body;

            if (!usuarioId || !nombreUsuario || !Array.isArray(productos) || productos.length === 0) {
                return res.status(400).json({ error: "Faltan datos requeridos" });
            }

            const nuevaCompra = await comprasModel.create({
                usuarioId,
                nombreUsuario,
                productos,
                fecha: new Date()
            });

            res.status(201).json(nuevaCompra);
        } catch (error) {
            console.error("Error al registrar compra:", error);
            res.status(500).json({ error: "Error interno del servidor", detalles: error.message });
        }
    }

    // Obtener todas las compras
    async getAll(req, res) {
        try {
            const compras = await comprasModel.getAll();
            res.status(200).json(compras);
        } catch (error) {
            console.error("Error al obtener compras:", error);
            res.status(500).json({ error: "Error al obtener compras", detalles: error.message });
        }
    }

    // Obtener compra por ID
    async getOne(req, res) {
        try {
            const { id } = req.params;
            const compra = await comprasModel.getById(id);

            if (!compra) {
                return res.status(404).json({ error: "Compra no encontrada" });
            }

            res.status(200).json(compra);
        } catch (error) {
            console.error("Error al obtener la compra:", error);
            res.status(500).json({ error: "Error al obtener la compra", detalles: error.message });
        }
    }
}

export default new CompraController();
