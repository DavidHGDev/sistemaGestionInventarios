import { getAllVenta, crearVentaConStock } from "../controllers/venta.controllers.js";
import e from "express";

const router = e.Router();

router.get('/', getAllVenta);
router.post('/', crearVentaConStock);

export default router;