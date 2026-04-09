import { prisma } from "../lib/prisma.js";

class ClientService {

    async getAllClients(){
        return await prisma.client.findMany();
    }

    async getOneClient(id){
        return await prisma.client.findUnique({
            where: {id: Number(id)}
        })
    }

    async createClient(data){
        return await prisma.client.create({
            data: data
        })
    }

    async updateClient({ id, ...data }){
        return await prisma.client.update({
            where: {id: Number(id)},
            data: data
        })
    }

    async deleteClient(id){
        return await prisma.client.delete({
            where: {id: Number(id)}
        })
    }

    async searchClients(termino) {
        return await prisma.client.findMany({
            where: {
                OR: [
                    { document: { contains: termino } },
                    { name: { contains: termino, mode: 'insensitive' } }
                ]
            },
            take: 10 // Solo los 10 mejores resultados
    });
}
}


export default new ClientService();