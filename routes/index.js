import e from "express";
import userRouter from './user.routes.js'
import ventasRouter from './ventas.routes.js'

const router = e.Router();

router.use('/user', userRouter); // lo manda a usuario
router.use('ventas', ventasRouter); 

export default router;
