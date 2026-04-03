import e from "express";
import authLogin from './auth.routes.js'
import userRouter from './user.routes.js'
import ventasRouter from './ventas.routes.js'
import clienteRouter from './client.routes.js'


const router = e.Router();

router.use('/login', authLogin);
router.use('/user', userRouter); // lo manda a usuario
router.use('/ventas', ventasRouter); 
router.use('/clients', clienteRouter);

export default router;
