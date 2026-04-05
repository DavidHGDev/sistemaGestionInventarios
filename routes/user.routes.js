import e from "express";
import { getUsers, getOneUser, createUser, updateUser, deleteUser } from "../controllers/user.controllers.js";
import { verificarToken } from "../middlewares/auth.middleware.js";
import { verficarRoles, verificarMismoUsuarioOadmin } from "../middlewares/verificarRoles.js";
import { validarSchema } from "../middlewares/validator.handler.js";
import { createUserSchema, updateUserSchema, idParamSchema } from "../schemas/user.schema.js";


const router = e.Router();

router.get('/',
    verificarToken, 
    verficarRoles(['ADMIN']), 
    getUsers);
router.get('/:id',
    verificarToken,
    verficarRoles(['ADMIN']),
    validarSchema(idParamSchema, 'params'),
    getOneUser);
router.post('/', 
    verificarToken,
    verficarRoles(['ADMIN']),
    validarSchema(createUserSchema, 'body'),
    createUser);
router.patch('/:id', 
    verificarToken,
    verificarMismoUsuarioOadmin,
    validarSchema(idParamSchema, 'params'),
    validarSchema(updateUserSchema, 'body'),
    updateUser);
router.delete('/:id', 
    verificarToken,
    verficarRoles(['ADMIN']),
    validarSchema(idParamSchema, 'params'),
    deleteUser);

export default router; // aquí exporto con la arquitectura de express, mini-ruta