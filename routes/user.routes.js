import e from "express";

const router = e.Router();

router.post('/', createUser)

export default router; // aquí exporto con la arquitectura de express, mini-ruta