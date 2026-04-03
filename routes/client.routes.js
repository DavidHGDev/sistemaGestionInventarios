import { getAllClients, getOneClients, createClient, updateClient, deleteClient } from "../controllers/client.controllers.js";
import e from "express";

const router = e.Router();

router.get('/', getAllClients);
router.get('/:id', getOneClients);
router.patch('/:id', updateClient);
router.post('/', createClient);
router.delete('/:id', deleteClient)

export default router;