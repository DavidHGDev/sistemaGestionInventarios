import { prisma } from "../lib/prisma.js";

class ProviderServices {
    
    async getAllProviders() {
        return await prisma.provider.findMany({
            // Traemos los productos que nos surte para saber qué le compramos
            include: { products: true } 
        });
    }

    async getOneProvider(id) {
        const provider = await prisma.provider.findUnique({
            where: { id: Number(id) },
            include: { products: true }
        });
        if (!provider) throw new Error("Proveedor no encontrado");
        return provider;
    }

    // 🔍 Buscador Dinámico
    async searchProviders(termino) {
        const esNumero = !isNaN(termino) && termino.trim() !== '';
        const condiciones = [
            { name: { contains: termino, mode: 'insensitive' } },
            { email: { contains: termino, mode: 'insensitive' } },
            { phone: { contains: termino } }
        ];
        if (esNumero) condiciones.push({ id: Number(termino) });

        return await prisma.provider.findMany({
            where: { OR: condiciones },
            take: 10
        });
    }

    async createProvider(data) {
        const { name, phone, email } = data;
        return await prisma.provider.create({
            data: { name, phone, email }
        });
    }

    async updateProvider(id, data) {
        const { name, phone, email } = data;
        await this.getOneProvider(id); // Validar que existe

        return await prisma.provider.update({
            where: { id: Number(id) },
            data: { name, phone, email }
        });
    }

    async deleteProvider(id) {
        await this.getOneProvider(id); // Validar que existe
        
        return await prisma.provider.delete({
            where: { id: Number(id) }
        });
    }
}

export default new ProviderServices();