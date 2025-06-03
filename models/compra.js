import mongoose from "mongoose";
import Compra from "../schemas/compra.js";

class compraModel {
    // Crear una compra
    async create(compra) {
        return await Compra.create(compra);
    }

    // Obtener todas las compras
    async getAll() {
        return await Compra.find();
    }

    // Obtener una compra por ID
    async getOneById(id) {
        return await Compra.findById(id);
    }

    // Eliminar una compra por ID
    async delete(id) {
        return await Compra.findOneAndDelete({ _id: new mongoose.Types.ObjectId(id) });
    }

    // Actualizar una compra por ID
    async update(id, compra) {
        return await Compra.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(id) },
            compra,
            { new: true }
        );
    }

    // Obtener compras por usuario
    async getComprasPorUsuario(usuarioId) {
        return await Compra.find({ usuarioId });
    }

 

    async comprasConProductosIndividualesPorUsuario(usuarioId) {
        return await Compra.aggregate([
            {
                $match: { usuarioId: new mongoose.Types.ObjectId(usuarioId) }
            },
            {
                $unwind: "$productos"
            },
            {
                $lookup: {
                    from: "products", 
                    localField: "productos.productoId",
                    foreignField: "_id",
                    as: "productoDetalles"
                }
            },
            {
                $unwind: "$productoDetalles"
            },
            {
                $project: {
                    _id: 1,
                    usuarioId: 1,
                    fecha: 1,
                    producto: "$productoDetalles.nombre",
                    categoria: "$productoDetalles.categoria",
                    cantidad: "$productos.cantidad",
                    precioUnitario: "$productos.precioUnitario",
                    subtotal: {
                        $multiply: ["$productos.cantidad", "$productos.precioUnitario"]
                    }
                }
            }
        ]);
    }

}

export default new compraModel();