import { z } from "zod";

export const createClientSchema = z.object({
    name: z.string({message: 'Ingrese un nombre válido '}).min(1, {message: 'Ingrese un carácter válido'}),
    phone: z.string({message: 'El número de teléfono es obligatorio'}).min(10, {message: 'Ingrese los 10 dígitos'}).optional(),
    email: z.string({message: 'El correo es obligatorio'}).email({message: 'El correo debe ser válido'}).optional(),
    tipoDocument: z.enum(['CC', 'TI', 'CE', 'NIT', 'PAS', 'PPT']),
    document: z.string({message: 'El documento es obligatorio'})
});

export const updateClientSchema = createClientSchema.partial();

export const idParamSchema = z.object({
    id: z.coerce.number({message: 'Debe ingresar un número válido de id'}).positive({message: 'Ingrese un número positivo'})
})