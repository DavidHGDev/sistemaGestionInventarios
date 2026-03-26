import e from "express";
import { prisma } from './lib/prisma.js'
import mainRouter from './routes/index.js'

const app = e();

app.use(e.json());

//crear crud para categoría. 

app.post('/categorie', async(req, res) => {
    try {
        const { name, description } = req.body;
        if(!(name.length > 3)) {
            throw new Error('la longitud del name debe ser superior a 3')
        }

        const newDate = await prisma.categorys.create({
            data: {
                name,
                description
            }
        })
        res.status(201).json(newDate)
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
            problem: "Error al guardar los datos in server"
        })
    }
})

app.get('/categorie', async(req, res) => {
    try {
        const data = await prisma.categorys.findMany();
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({
            status: 'Error',
            message: error.message,
            prob: 'Error al cosultar categorie'
        })   
    }
})

app.patch('/categorie/:id', async(req, res) => {
    try {
        const { id } = req.params;

        const { name, description } = req.body;

        const data = await prisma.categorys.update({
            where: {
                id: Number(id)
            },
            data: {
                name, 
                description
            }
        })
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({
            status: 'Error',
            message: error.message,
            prob: 'Error al cosultar categorie'
        })
    }
})

app.delete('/categorie/:id', async(req, res) => {
    const { id } = req.params;
    await prisma.categorys.delete({
        where: {
            id: Number(id)
        }
    })
    const data = await prisma.categorys.findMany()
    res.status(200).json({
        message: `el id ${id} fue eliminado`,
        data: data
    })
})

app.use('/api', mainRouter); //aquí en app.js, se llama a la ruta principal- 

app.listen(3007, ()=> {
    console.log('http://localhost:3007')
})