import { getAllClients, getOneClients, createClient, updateClient, deleteClient, searchClients } from "../controllers/client.controllers.js";
import e from "express";
import { verificarToken } from '../middlewares/auth.middleware.js';
import { verficarRoles } from '../middlewares/verificarRoles.js';
import { validarSchema } from "../middlewares/validator.handler.js";
import { createClientSchema, updateClientSchema, idParamSchema } from "../schemas/client.schema.js";
import { PERMISOS } from "../config/roles.js";

const router = e.Router();

router.get('/', 
    verificarToken, 
    verficarRoles(PERMISOS.LEER_CLIENTES), 
    getAllClients);

router.get('/search', verificarToken, searchClients);

router.get('/:id', 
    verificarToken,
    verficarRoles(PERMISOS.LEER_CLIENTES),
    validarSchema(idParamSchema, 'params'),
    getOneClients);
router.patch('/:id', 
    verificarToken,
    verficarRoles(PERMISOS.ESCRIBIR_CLIENTES),
    validarSchema(idParamSchema, 'params'),
    validarSchema(updateClientSchema, 'body'),
    updateClient);
router.post('/', 
    verificarToken,
    verficarRoles(PERMISOS.ESCRIBIR_CLIENTES),
    validarSchema(createClientSchema, 'body'),
    createClient);
router.delete('/:id', 
    verificarToken,
    verficarRoles(PERMISOS.ELIMINAR_CLIENTES),
    validarSchema(idParamSchema, 'params'),
    deleteClient);

export default router;