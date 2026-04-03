import { prisma } from "../lib/prisma.js";
import bcrypt from 'bcrypt';

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
        console.log(passwordCorrecto);

        return {
            id: usuarioExistente.id,
            name: usuarioExistente.name,
            email: usuarioExistente.email,
            role: usuarioExistente.role
        }
    }
}

export default new AuthLogin();