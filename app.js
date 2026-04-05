import e from "express";
import mainRouter from './routes/index.js'
import { manejadorDeErrores } from "./middlewares/error.Handler.js";

const app = e();
const PORT = 3007;

app.use(e.json());

app.use('/api', mainRouter); //aquí en app.js, se llama a la ruta principal- 

app.use(manejadorDeErrores);

app.listen(PORT, ()=> {
    console.log(`localhost:${PORT}`)
})