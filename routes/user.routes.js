import e from "express";
import { getUsers, getOneUser, createUser, updateUser, deleteUser } from "../controllers/user.controllers.js";

const router = e.Router();

router.get('/', getUsers);
router.get('/:id', getOneUser);
router.post('/', createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router; // aquí exporto con la arquitectura de express, mini-ruta