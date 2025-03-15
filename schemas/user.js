import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema= new Schema({

    email: {
      type:String,
      required:true,
      unique:true,
      trim:true
    },  
    nombre: {
        type:String,
        required:true,
        trim:true
    }, 
    apellido: {
        type:String,
        required:true,
        trim:true
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
        required:true
    }, 
  status:Boolean
},{timestamps:true}
);

export default mongoose.model('user',userSchema);