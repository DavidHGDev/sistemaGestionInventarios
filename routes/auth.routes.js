import { authLogin } from "../controllers/auth.controllers.js";
import e from "express";

const router = e.Router();

router.post('/', authLogin);

export default router;