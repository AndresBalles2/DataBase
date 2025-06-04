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

            const total = productos.reduce((suma, p) => suma + (p.precioUnitario * p.cantidad), 0);

            const nuevaCompra = await comprasModel.create({
                usuarioId,
                nombreUsuario,
                productos,
                total, 
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

   async obtenerProductosDeCompras(req, res) {
        try {
            const usuarioId = req.query.usuario;
            if (!usuarioId) {
                return res.status(400).json({ error: "Falta el ID del usuario." });
            }

            const productosIndividuales = await comprasModel.comprasConProductosIndividualesPorUsuario(usuarioId);
            res.status(200).json(productosIndividuales);
        } catch (error) {
            console.error("Error al obtener compras:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    async obtenerHistorial(req, res) {
    try {
        const tipoUsuario = req.query.tipo; 

        if (tipoUsuario !== "admin") {
            return res.status(403).json({ error: "Acceso no autorizado. Solo administradores." });
        }

        const historial = await comprasModel.historialCompras(); 
        res.status(200).json(historial);
    } catch (error) {
        console.error("Error al obtener historial completo de compras:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

}

export default new CompraController();
