import mongoose from "mongoose";

const { Schema } = mongoose;

const compraSchema = new Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  nombreUsuario: {
    type: String,
    required: true
  },
  productos: [{
    productoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Producto',
      required: true
    },
    nombre: String,
    cantidad: {
      type: Number,
      required: true,
      min: 1
    },
    precioUnitario: {
      type: Number,
      required: true
    }
  }],
  total: {
    type: Number,
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("compra", compraSchema);
