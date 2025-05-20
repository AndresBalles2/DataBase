import  jsonwebtoken  from 'jsonwebtoken';
import 'dotenv/config'

export function generarToken(usuario) {
    return jsonwebtoken.sign(
        {
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email
        },
        process.env.JWT_TOKEN_SEC,
        { expiresIn: '1h' }
    );
}

