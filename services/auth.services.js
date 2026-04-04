import { prisma } from "../lib/prisma.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class AuthLogin {
    async login(email, password){
        const usuarioExistente = await prisma.user.findUnique({
            where: { email: email }
        })
        if(!usuarioExistente){
            throw new Error("Credenciales inválidas");
        }
        const passwordCorrecto = await bcrypt.compare(password, usuarioExistente.password);
        if(!passwordCorrecto) {
            throw new Error("Credenciales inválidas");
        }
        
        //payload información publica que va en el token
        const payload = {
            id: usuarioExistente.id,
            role: usuarioExistente.role,
            name: usuarioExistente.name
        }
        //firmar el token 
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '8h'}
        )

        return {
            usuario: {
            id: usuarioExistente.id,
            name: usuarioExistente.name,
            email: usuarioExistente.email,
            role: usuarioExistente.role
            },
            token: token

        }

    }
}

export default new AuthLogin();