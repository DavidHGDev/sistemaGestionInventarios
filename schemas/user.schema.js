import { z } from "zod";


export const createUserSchema = z.object({
    name: z.string({ message: 'El nombre es obligatorio ' }).min(1, {message: 'El nombre no puede estar vació'}),
    lastName: z.string().optional(),
    email: z.string({ message: 'El correo es obligatorio' }).email({ message: 'el formato de correo no es válido' }),
    password: z.string({ message: 'La contraseña es obligatoria' }).min(8, { message: 'debe tener mínimo 8 carácteres'} ),
    role: z.enum(['ADMIN', 'VENDEDOR', 'AUDITOR']).optional()
});

export const updateUserSchema = createUserSchema.partial();

export const idParamSchema = z.object({
    id: z.coerce.number().positive()
})