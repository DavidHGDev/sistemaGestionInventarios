import { getAllVenta, crearVentaConStock, updateVenta } from "../controllers/venta.controllers.js";
import e from "express";

const router = e.Router();

router.get('/', getAllVenta);
router.get('/:id', getAllVenta);
router.post('/', crearVentaConStock);
router.put('/:id', updateVenta);

export default router;