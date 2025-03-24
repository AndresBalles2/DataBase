import mongoose from "mongoose";
import Usuario from "../schemas/user.js";

class usuarioModel {
    // Crear un producto
    async create(usuario) {
        return await Usuario.create(usuario);
    }

    // Actualizar un Usuarioo por ID
    async update(id, Usuario) {
        return await Usuario.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(id) },Usuario,{ new: true }
        );
    }

    // Eliminar un Usuarioo por ID
    async delete(id) {
        return await Usuario.findOneAndDelete({ _id: new mongoose.Types.ObjectId(id) });
    }

    // Obtener todos los Usuarioos
    async getAll() {
        return await Usuario.find();
    }

    // Obtener un Usuarioo por ID
    async getOneById(id) {
        return await Usuario.findById(id);
    }

    // Obtener un Usuarioo por cualquier criterio (ejemplo: nombre, categoría, precio)
    async getOne(id) {
        return await Usuario.findOne(id);
    }
}

export default new usuarioModel();
