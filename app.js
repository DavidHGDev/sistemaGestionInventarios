import e from "express";
import mainRouter from './routes/index.js'
import { manejadorDeErrores } from "./middlewares/error.Handler.js";
import cors from 'cors';

// const corsOption = {
//     origin: 'http://localhost:5500/',
//     optionsSuccesStatus: 200
// }

const app = e();
const PORT = 3007;

app.use(e.json());
app.use(cors())

app.use('/api', mainRouter); //aquí en app.js, se llama a la ruta principal- 

app.use(manejadorDeErrores);

app.listen(PORT, ()=> {
    console.log(`localhost:${PORT}`)
})