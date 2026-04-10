import { prisma } from "../lib/prisma.js";
import bcrypt from 'bcrypt';

class UserServices {

    #userSelect = {
        id: true,
        name: true,
        lastName: true,
        email: true,
        role: true,
        isActive: true
    }
    #ventasSelect = {
        select: {
            id: true,
            fecha: true,
            saldoTotal: true
        }
    }

    async getAllUsers(){
        return await prisma.user.findMany({
            select: this.#userSelect
        });
    }

    async getOneUser(id) {
        return await prisma.user.findUnique({
            where: { id: id }, select: { 
                ...this.#userSelect, 
                ventas: this.#ventasSelect
            }
        })
    }

    async createUser(data) {
        const { name, lastName, email, password, role } = data;
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await prisma.user.create({
            data: {
                name,
                lastName,
                email,
                password: hashPassword,
                role

            }, select: this.#userSelect
        });
        return newUser;
    }

    async updateUser({ id, ...data }) {
        const { name, lastName, email, password, role } = data;
        const saltRounds = 10;

        let datosAActualizar = { name, lastName, email, role } 
        if(password){
            datosAActualizar.password = await bcrypt.hash(password, saltRounds);
        }
        return await prisma.user.update({
            where: { id: id },
            data: datosAActualizar,
            select: this.#userSelect
        })
    }

    async deleteUser(id) {
        return await prisma.user.delete({
            where: { id: id},
            select: this.#userSelect
        })
    }

    async searchUsers(termino) {
        // Si el término es un número exacto, lo buscamos por ID
        const esNumero = !isNaN(termino) && termino.trim() !== '';
        
        const condiciones = [
            { name: { contains: termino, mode: 'insensitive' } },
            { email: { contains: termino, mode: 'insensitive' } },
            { lastName: { contains: termino, mode: 'insensitive' } }
        ];

        if (esNumero) condiciones.push({ id: Number(termino) });

        return await prisma.user.findMany({
            where: { OR: condiciones },
            select: { id: true, name: true, lastName: true, email: true, role: true },
            take: 8 // Límite para el autocompletado
        });
    }
}

export default new UserServices();