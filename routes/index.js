import e from "express";
import authLogin from './auth.routes.js'
import userRouter from './user.routes.js'
import ventasRouter from './ventas.routes.js'
import clienteRouter from './client.routes.js'
import productRouter from './product.routes.js'
import providerRouter from './provider.routes.js'


const router = e.Router();

router.use('/auth', authLogin);
router.use('/users', userRouter); // lo manda a usuario
router.use('/sales', ventasRouter); 
router.use('/clients', clienteRouter);
router.use('/products', productRouter);
router.use('/providers', providerRouter);

export default router;
