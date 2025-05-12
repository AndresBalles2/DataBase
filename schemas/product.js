import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    categoria: { 
        type: String,
        required: true,
        trim: true
    },
    precio: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    imagen: {
        type: String,
        default: "./img/default.jpg"
    }
}, { timestamps: true });

export default mongoose.model("product", productSchema);
