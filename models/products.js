import mongoose from "mongoose";
import Product from "../schemas/product.js";

class productModel {
    // Crear un producto
    async create(product) {
        return await Product.create(product);
    }

    // Actualizar un producto por ID
    async update(id, product) {
        return await Product.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(id) },product,{ new: true }
        );
    }

    // Eliminar un producto por ID
    async delete(id) {
        return await Product.findOneAndDelete({ _id: new mongoose.Types.ObjectId(id) });
    }

    // Obtener todos los productos
    async getAll() {
        return await Product.find();
    }

    // Obtener un producto por ID
    async getOneById(id) {
        return await Product.findById(id);
    }

    // Obtener un producto por cualquier criterio (ejemplo: nombre, categoría, precio)
    async getOne(filtro) {
        return await Product.findOne(filtro);
    }

    // Agrupar productos por categoría
    async groupByCategory() {
        return await Product.aggregate([
            { $group: { 
                    _id: "$categoria", 
                    totalProductos: { $sum: "$precio"},
                    totalStock: {  $sum: "$stock" } 
                },
            },

            { $sort: { _id: 1 } },

            {$limit: 5},
        ]);
    }

    async getProductosProyectados() {
        return await Product.aggregate([
            {
                $project: {
                    nombre: 1,
                    categoria: 1,
                    precio: 1,
                    precioConIVA: { $multiply: ["$precio", 1.19] }
                }
            },
            { $skip: 1 },
        ]);
    }

    async filtrarPorCategoria(categoria) {
        console.log('modelo:', categoria); 
        return await Product.aggregate([
            {
                $match: { categoria: categoria.categoria } // Filtra productos por la categoría recibida
            },
            {
                $project: {
                    nombre: 1,
                    categoria: 1,
                    precio: 1,
                    stock: 1
                }
            }
        ]);
    }

}

export default new productModel();
