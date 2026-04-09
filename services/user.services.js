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
        const hashPassword = await bcrypt.hash(password, saltRounds);
        return await prisma.user.update({
            where: {
                id: id
            },
            data: {
                name,
                lastName,
                email,
                password: hashPassword, 
                role
            }
            , select: this.#userSelect
        })
    }

    async deleteUser(id) {
        return await prisma.user.delete({
            where: { id: id},
            select: this.#userSelect
        })
    }
}

export default new UserServices();