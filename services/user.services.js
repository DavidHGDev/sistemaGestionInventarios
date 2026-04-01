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
        return await prisma.user.findMany({
            select: this.#userSelect
        });
    }

    async getOneUser(id) {
        return await prisma.user.findUnique({
            where: { id: Number(id) }, select: { 
                ...this.#userSelect, 
                ventas: this.#ventasSelect
            }
        })
    }

    async createUser(data) {
        const newUser = await prisma.user.create({
            data, select: this.#userSelect
        });
        return newUser;
    }

    async updateUser({ id, ...data }) {
        return await prisma.user.update({
            where: {
                id: Number(id)
            },
            data, select: this.#userSelect
        })
    }

    async deleteUser(id) {
        return await prisma.user.delete({
            where: { id: Number(id)},
            select: this.#userSelect
        })
    }
}

export default new UserServices();