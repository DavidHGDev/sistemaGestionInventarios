import { Router } from "express";
import { getAllCategories, getOneCategory, createCategory, updateCategory, deleteCategory } from "../controllers/category.controllers.js";
import { verificarToken } from "../middlewares/auth.middleware.js";
import { verficarRoles } from "../middlewares/verificarRoles.js";
import { validarSchema } from "../middlewares/validator.handler.js";
import { createCategorySchema, updateCategorySchema } from "../schemas/category.schema.js";
import { idParamSchema } from "../schemas/user.schema.js"; // Reutilizamos tu schema de ID general
import { PERMISOS } from "../config/roles.js"; // Ajusta según tus permisos

const router = Router();

router.get('/', 
    verificarToken, 
    getAllCategories
);

router.get('/:id', 
    verificarToken,
    validarSchema(idParamSchema, 'params'),
    getOneCategory
);

router.post('/', 
    verificarToken,
    verficarRoles(PERMISOS.ESCRIBIR_CATEGORIAS), // 👈 O el permiso de inventario que tengas
    validarSchema(createCategorySchema, 'body'),
    createCategory
);

router.patch('/:id', 
    verificarToken,
    verficarRoles(PERMISOS.ADMIN), 
    validarSchema(idParamSchema, 'params'),
    validarSchema(updateCategorySchema, 'body'),
    updateCategory
);

router.delete('/:id', 
    verificarToken,
    verficarRoles(PERMISOS.ADMIN),
    validarSchema(idParamSchema, 'params'),
    deleteCategory
);

export default router;