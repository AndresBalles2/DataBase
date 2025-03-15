import express from 'express';
import 'dotenv/config'
import routesUsers from './routes/user.js'
import bodyParser from 'body-parser';
const app= express();
import dbClient from './config/dbClient.js';
// para uso de middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.use('/users',routesUsers)

try {
    const PORT= process.env.PORT || 3000;
    app.listen(PORT,()=> console.log("servidor activo en el puesto "+PORT))
} catch (e) {
    console.log(e);
}

process.on('SIGINT', async() =>{
    dbClient.cerrarConexion();
    process.exit(0);
})