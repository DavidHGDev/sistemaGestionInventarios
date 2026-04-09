import { z } from 'zod';

export const createProductSchema = z.object({
    nameProduct: z.string().min(2, "El nombre del producto debe tener al menos 2 caracteres"),
    price: z.number().positive("El precio debe ser mayor a 0"),
    stock: z.number().int().nonnegative("El stock no puede ser negativo").default(0),
    categoryId: z.number().int().positive("La categoría es obligatoria"),
    // Recibimos un arreglo de números (IDs de los proveedores)
    providerIds: z.array(z.number().int()).optional().default([]) 
});

export const updateProductSchema = z.object({
    nameProduct: z.string().min(2).optional(),
    price: z.number().positive().optional(),
    stock: z.number().int().nonnegative().optional(),
    categoryId: z.number().int().positive().optional(),
    providerIds: z.array(z.number().int()).optional()
});