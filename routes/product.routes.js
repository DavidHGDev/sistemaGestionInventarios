import { Router } from "express";
import { 
    getAllProducts, 
    getOneProduct, 
    createProduct, 
    updateProduct, 
    deleteProduct, 
    searchProducts 
} from "../controllers/product.controllers.js";

// Aquí deberías importar tus middlewares, por ejemplo:
import { verificarToken } from "../middlewares/auth.middleware.js";
import { validarSchema } from "../middlewares/validator.handler.js";
import { createProductSchema, updateProductSchema } from "../schemas/product.schema.js";

const router = Router();

// 1. Rutas específicas (¡Siempre primero!)
router.get('/search', verificarToken, searchProducts);
//router.get('/search', searchProducts); // Pon el verificarToken cuando lo tengas

// 2. Rutas Generales (Leer todos y Crear)
router.get('/', verificarToken, getAllProducts);
router.post('/', verificarToken, validarSchema(createProductSchema), createProduct);
//router.get('/', getAllProducts);
//router.post('/', createProduct);

// 3. Rutas Parametrizadas (ID dinámico, van al final)
router.get('/:id', verificarToken, getOneProduct);
router.patch('/:id', verificarToken, validarSchema(updateProductSchema), updateProduct);
router.delete('/:id', verificarToken, deleteProduct);
//router.get('/:id', getOneProduct);
//router.patch('/:id', updateProduct);
//router.delete('/:id', deleteProduct);

export default router;