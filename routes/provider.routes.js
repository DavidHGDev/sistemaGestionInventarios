import { Router } from "express";
import { 
    getAllProviders, 
    getOneProvider, 
    createProvider, 
    updateProvider, 
    deleteProvider, 
    searchProviders 
} from "../controllers/provider.controllers.js";

// IMPORTA TU MIDDLEWARE AQUÍ
import { verificarToken } from "../middlewares/auth.middleware.js";

const router = Router();

// 1. Buscador (Arriba del todo)
router.get('/search', verificarToken, searchProviders);

// 2. Rutas Generales
router.get('/', verificarToken, getAllProviders);
router.post('/', verificarToken, createProvider);

// 3. Rutas Parametrizadas (ID)
router.get('/:id', verificarToken, getOneProvider);
router.patch('/:id', verificarToken, updateProvider);
router.delete('/:id', verificarToken, deleteProvider);

export default router;