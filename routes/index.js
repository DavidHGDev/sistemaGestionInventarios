import e from "express";
import userRouter from './user.routes.js'

const router = e.Router();

router.use('/user', userRouter); // lo manda a usuario

export default router;
