import { authLogin } from "../controllers/auth.controllers.js";
import e from "express";

const router = e.Router();

router.post('/login', authLogin);

export default router;