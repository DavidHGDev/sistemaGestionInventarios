import { getAllClients, getOneClients, createClient, updateClient, deleteClient } from "../controllers/client.controllers.js";
import e from "express";
import { verificarToken } from '../middlewares/auth.middleware.js';
import { verficarRoles } from '../middlewares/verificarRoles.js';

const router = e.Router();

router.get('/', 
    verificarToken, 
    verficarRoles(['VENDEDOR', 'AUDITOR']), 
    getAllClients);
router.get('/:id', getOneClients);
router.patch('/:id', updateClient);
router.post('/', createClient);
router.delete('/:id', deleteClient)

export default router;