import { z } from 'zod';

export const createCategorySchema = z.object({
    name: z.string({ required_error: "El nombre de la categoría es obligatorio" })
           .min(2, "El nombre debe tener al menos 2 caracteres"),
    description: z.string().optional() // Es opcional en tu esquema Prisma
});

export const updateCategorySchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres").optional(),
    description: z.string().optional()
});