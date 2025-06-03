import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        index: true,
        minlength: [3, "El nombre debe tener al menos 3 caracteres"]
    },
    descripcion: {
        type: String,
        required: true,
        trim: true,
        maxlength: [150, "La descripción es muy larga"]
    },
    categoria: { 
        type: String,
        required: true,
        trim: true
    },
    precio: {
        type: Number,
        required: true,
        min: [0, "El precio no puede ser negativo"]
    },
    stock: {
        type: Number,
        required: true,
        min: [0, "El stock no puede ser negativo"]
    },
    imagen: {
        type: String,
        default: "./img/default.jpg"
    }
}, { timestamps: true });

export default mongoose.model("product", productSchema);
