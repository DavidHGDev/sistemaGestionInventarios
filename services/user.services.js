import { prisma } from "../lib/prisma.js";

class UserServices {

    #userSelect = {
        id: true,
        name: true,
        lastName: true,
        email: true
    }
    #ventasSelect = {
        select: {
            id: true,
            fecha: true,
            saldoTotal: true
        }
    }

    async getAllUsers(){
        return await prisma.users.findMany({
            select: this.#userSelect
        });
    }

    async getOneUser(id) {
        return await prisma.users.findUnique({
            where: { id: Number(id) }, select: { 
                ...this.#userSelect, 
                ventas: this.#ventasSelect
            }
        })
    }

    async createUser(data) {
        const newUser = await prisma.users.create({
            data, select: this.#userSelect
        });
        return newUser;
    }

    async updateUser({ id, ...data }) {
        return await prisma.users.update({
            where: {
                id: Number(id)
            },
            data, select: this.#userSelect
        })
    }

    async deleteUser(id) {
        return await prisma.users.delete({
            where: { id: Number(id)},
            select: this.#userSelect
        })
    }
}

export default new UserServices();