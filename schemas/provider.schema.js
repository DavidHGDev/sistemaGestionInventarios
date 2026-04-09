import { z } from 'zod';

export const createProviderSchema = z.object({
    name: z.string().min(2, "El nombre del proveedor es obligatorio"),
    phone: z.string().optional(),
    email: z.string().email("Formato de correo inválido").optional().or(z.literal(''))
});

export const updateProviderSchema = z.object({
    name: z.string().min(2).optional(),
    phone: z.string().optional(),
    email: z.string().email().optional().or(z.literal(''))
});