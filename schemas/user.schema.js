import { z } from "zod";


export const createUserSchema = z.object({
    name: z.string({ required_error: 'El nombre es obligatorio '}),
    lastName: z.string().optional(),
    email: z.string({ required_error: 'El correo es obligatorio' }).email({ required_error: 'el formato de correo no es válido' }),
    password: z.string({ required_error: 'La contraseña es obligatoria' }).min(8, { required_error: 'debe tener mínimo 8 carácteres'} ),
    role: z.enum(['ADMIN', 'VENDEDOR', 'AUDITOR']).optional()
});

export const updateUserSchema = createUserSchema.partial();

export const idParamSchema = z.object({
    id: z.coerce.number().positive()
})