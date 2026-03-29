import { getAllVenta } from "../controllers/venta.controllers.js";
import e from "express";

const router = e.Router();

router.get('/', getAllVenta);

export default router;