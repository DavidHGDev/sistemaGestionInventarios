import { Router } from "express";
import { getAllVenta, getOneVenta, crearVentaConStock, updateVenta } from "../controllers/venta.controllers.js";

// 🚨 1. IMPORTAMOS LOS MIDDLEWARES DE SEGURIDAD (Esto arregla tu bug)
import { verificarToken } from "../middlewares/auth.middleware.js";
import { validarSchema } from "../middlewares/validator.handler.js"; 

// 2. IMPORTAMOS LOS ESQUEMAS
import { createVentaSchema, updateVentaSchema } from "../schemas/venta.schema.js";

const router = Router();

// ==========================================
// RUTAS BLINDADAS
// ==========================================

router.get('/', 
    verificarToken, 
    getAllVenta
);

router.get('/:id', 
    verificarToken, 
    getOneVenta
);

router.post('/', 
    verificarToken, // 👈 ¡ESTO CREA EL req.usuario!
    validarSchema(createVentaSchema, 'body'), // 👈 Esto valida el carrito
    crearVentaConStock
);

router.patch('/:id', 
    verificarToken, 
    validarSchema(updateVentaSchema, 'body'),
    updateVenta
);

export default router;