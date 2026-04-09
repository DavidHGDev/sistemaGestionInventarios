import { prisma } from "../lib/prisma.js";

class ProductServices {
    
    // Selectores para traer siempre las relaciones por defecto
    #includeRelations = {
        category: true,
        providers: true
    };

    async getAllProducts() {
        return await prisma.product.findMany({
            include: this.#includeRelations
        });
    }

    async getOneProduct(id) {
        const product = await prisma.product.findUnique({
            where: { id: Number(id) },
            include: this.#includeRelations
        });
        if (!product) throw new Error("Producto no encontrado");
        return product;
    }

    // 🔍 EL BUSCADOR DINÁMICO QUE CREAMOS ANTES
    async searchProducts(termino) {
        const esNumero = !isNaN(termino) && termino.trim() !== '';
        const condiciones = [
            { nameProduct: { contains: termino, mode: 'insensitive' } },
            { category: { name: { contains: termino, mode: 'insensitive' } } }
        ];
        if (esNumero) condiciones.push({ id: Number(termino) });

        return await prisma.product.findMany({
            where: { OR: condiciones },
            include: { category: true },
            take: 15
        });
    }

    async createProduct(data) {
        const { nameProduct, price, stock, categoryId, providerIds } = data;

        return await prisma.product.create({
            data: {
                nameProduct,
                price,
                stock,
                categoryId,
                // Si envían IDs de proveedores, los conectamos en la tabla pivote
                providers: providerIds && providerIds.length > 0 
                    ? { connect: providerIds.map(id => ({ id })) }
                    : undefined
            },
            include: this.#includeRelations
        });
    }

    async updateProduct(id, data) {
        const { nameProduct, price, stock, categoryId, providerIds } = data;

        // Comprobamos si el producto existe antes de actualizar
        await this.getOneProduct(id); 

        return await prisma.product.update({
            where: { id: Number(id) },
            data: {
                nameProduct,
                price,
                stock,
                categoryId,
                // 'set' sobrescribe las relaciones. Si mandas [1, 3], borrará el 2 si existía.
                providers: providerIds !== undefined 
                    ? { set: providerIds.map(provId => ({ id: provId })) }
                    : undefined
            },
            include: this.#includeRelations
        });
    }

    async deleteProduct(id) {
        await this.getOneProduct(id); // Validar si existe

        return await prisma.product.delete({
            where: { id: Number(id) }
        });
    }
}

export default new ProductServices();