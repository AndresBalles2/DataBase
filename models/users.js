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
}

export default new productModel();
