import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema= new Schema({

    email: {
      type:String,
      required:true,
      unique:true,
      trim:true,
      index: true,
      minlength: [3, "El apellido debe tener al menos 3 caracteres"],
      maxlength: [20, "El apellido debe tener maximo 20 caracteres"]
    },  
    nombre: {
        type:String,
        required:true,
        trim:true
    }, 
    apellido: {
        type:String,
        required:true,
        trim:true,
        minlength: [3, "El apellido debe tener al menos 3 caracteres"],
        maxlength: [20, "El apellido debe tener maximo 20 caracteres"]
    }, 
    telefono: {
        type:String,
        required:true
    }, 
    tipo: {
        type:String,
        required:true
    }, 
    clave:{
        type:String,
        required:true,
        minlength: [8, "La contraseña debe tener al menos 8 caracteres"]
    }, 
  status:Boolean
},{timestamps:true}
);

export default mongoose.model('user',userSchema);