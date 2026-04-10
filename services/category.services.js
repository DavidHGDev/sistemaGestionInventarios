import { prisma } from "../lib/prisma.js";

class CategoryServices {
    
    async getAllCategories() {
        return await prisma.category.findMany({
            // 🧠 Le decimos a Prisma que cuente cuántos productos tiene esta categoría
            include: {
                _count: {
                    select: { products: true }
                }
            }
        });
    }

    async getOneCategory(id) {
        const category = await prisma.category.findUnique({
            where: { id: Number(id) },
            include: {
                _count: { select: { products: true } }
            }
        });
        if (!category) throw new Error("Categoría no encontrada");
        return category;
    }

    async createCategory(data) {
        const { name, description } = data;
        return await prisma.category.create({
            data: { name, description }
        });
    }

    async updateCategory(id, data) {
        const { name, description } = data;
        await this.getOneCategory(id); // Validar que existe

        return await prisma.category.update({
            where: { id: Number(id) },
            data: { name, description }
        });
    }

    async deleteCategory(id) {
        // 1. Buscamos la categoría y contamos sus productos
        const category = await this.getOneCategory(id);
        
        // 2. 🛡️ ESCUDO: Si tiene productos, bloqueamos la eliminación
        if (category._count.products > 0) {
            throw new Error(`No se puede eliminar la categoría porque tiene ${category._count.products} productos asociados.`);
        }
        
        // 3. Si está vacía, la eliminamos sin problema
        return await prisma.category.delete({
            where: { id: Number(id) }
        });
    }
}

export default new CategoryServices();