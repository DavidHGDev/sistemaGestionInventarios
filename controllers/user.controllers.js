import UserServices from '../services/user.services.js'

export async function getUsers(req, res){
    try {
        const users = await UserServices.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ status: 'Error', message: error.message })
    }
}

export async function getOneUser(req, res) {
    try {
        const { id } = req.params;
        const user = await UserServices.getOneUser(id);
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ status: 'Error', message: error.message })
    }
}

export async function createUser(req, res) {
    try {
        const { name, lastName, email, password } = req.body;
        const newUser = await UserServices.createUser({ name, lastName, email, password });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ status: 'Error', message: error.message })
    }
}

export async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const { name, lastName, email, password } = req.body;
        const updateUser = await UserServices.updateUser({ id, name, lastName, email, password });
        res.status(200).json(updateUser)
    } catch (error) {
        res.status(500).json({ status: 'Error', message: error.message })
    }
}

export async function deleteUser(req, res) {
    try {
        const { id } = req.params;
        const deleteUser = await UserServices.deleteUser(id);
        res.status(200).json({message: 'usuario eliminado con éxito', user: deleteUser})
    } catch (error) {
        if(error.code === 'P2025'){
            res.status(404).json({ status: 'Error', message: 'Registro no encontrado'})
        }

        res.status(500).json({ status: 'Error', message: error.message })
    }
}