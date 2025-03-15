import usersModel from '../models/users.js';
import bcrypt from 'bcryptjs'
import  jsonwebtoken  from 'jsonwebtoken';
import { generarToken } from '../helpers/autenticacion.js';
class userController{
    constructor(){

    }
    async register(req,res){
        try{
            const {email,nombre,apellido,telefono,tipo,clave} = req.body;
            const usuarioExiste = await usersModel.getOne({email})
            if (usuarioExiste){
                return res.status(400).json({error:"el usuario existe"})
            }

            const claveE = await bcrypt.hash(clave,10);
          
            const data = await usersModel.create({
                email,nombre,apellido,telefono,tipo,clave:claveE
            });
            res.status(201).json(data)
        }catch(e){
            res.status(500).send(e)
            console.log(e)
        }
    }

    async login(req,res){
        const {email,clave} = req.body

        const usuarioExiste = await usersModel.getOne({email})
            if (!usuarioExiste){
                return res.status(400).json({error:"el usuario no existe"})
        }

        const claveValida= await bcrypt.compare(clave,usuarioExiste.clave);

        if(!claveValida){
            return res.status(400).json({error:"clave no valida"})
        }
        const token = generarToken(email);

        return res.status(200).json({msg:"usuario autenticado",token})

    }

    async create(req,res){
        try{
            const data = await usersModel.create(req.body);
            res.status(201).json(data)
        }catch(e){
            res.status(500).send(e)
        }
    }
    async update(req,res){
        try{
            const {id} = req.params;
            const data = await usersModel.update(id,req.body);
            res.status(201).json(data)
        }catch(e){

            res.status(500).send(e)
        }
    }

    async delete(req,res){
        try{
            const {id} = req.params;
            const data = await usersModel.delete(id);
            res.status(206).json(data)
        }catch(e){
            res.status(500).send(e)
        }
    }

    async getAll(req,res){
        try{
            const data = await usersModel.getAll()
            res.status(201).json(data)
        }catch(e){
            res.status(500).send(e)
        }
    }
    async getOne(req,res){
        try{
            const {id} = req.params;
            const data = await usersModel.getOne(id);
            res.status(201).json(data)
        }catch(e){
            res.status(500).send(e)
        }
    }
}
export default new userController();

