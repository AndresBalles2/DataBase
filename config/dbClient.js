import 'dotenv/config'
import mongoose from 'mongoose';


class dbClient{
    constructor(){
        this.conectarBaseDatos();
    }
    async conectarBaseDatos(){
        const queryString='mongodb+srv://hjrianol:admin1234@cluster0.pnlsw.mongodb.net/cliente?retryWrites=true&w=majority&';
        await mongoose.connect(queryString)
        console.log("conectado")
    }

    async cerrarConexion(){
        try {
            await mongoose.disconnect();
        } catch (e) {
            console.log("erro al cerra conexion: ",e)
        }
    }
    
}

export default new dbClient();