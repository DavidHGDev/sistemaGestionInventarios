import express from 'express';
import { prisma } from './lib/prisma.js';

const app = express();
app.use(express.json());

app.get('/', async(req, res) => {
    try {
        const data = await prisma.usuarios.findMany();
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
            falla: "error presentado al consultar los datos en el servidor"
        });
    }
})

app.post('/user', async(req, res) => {
    try {
        const { email, name } = req.body
        const newUser = await prisma.usuarios.create({
            data: { email, name }
        });

        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "error al momento de crear un usuario en el servidor",
            error: error.message
        })
    }
})

app.post('/post', async(req, res) => {
    try {
        const { authorId, content, published, title } = req.body
        const newUser = await prisma.post.create({
            data: { authorId, content, published, title }
        });

        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "error al momento de crear un usuario en el servidor",
            error: error.message
        })
    }
})


app.listen(3007, ()=> {
    console.log('http://localhost:3007')
})