import { z } from 'zod';

// Sub-esquema para validar cada producto dentro del carrito
const itemVentaSchema = z.object({
    productId: z.number().int().positive("El ID del producto es inválido"),
    cantidadVendida: z.number().positive("La cantidad debe ser mayor a cero")
});

export const createVentaSchema = z.object({
    clientId: z.number().int().positive("Debes seleccionar un cliente válido"),
    isContado: z.boolean({ required_error: "Debe especificar si es de contado o crédito" }),
    // Validamos que sea un arreglo y que tenga al menos 1 producto
    items: z.array(itemVentaSchema).min(1, "El carrito no puede estar vacío") 
});

export const updateVentaSchema = z.object({
    isContado: z.boolean().optional(),
    // Para modificar, el backend también requiere el arreglo de nuevos items
    items: z.array(itemVentaSchema).min(1, "El carrito no puede estar vacío")
});