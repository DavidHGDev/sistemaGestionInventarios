import UserServices from '../services/user.services.js'

export async function getUsers(req, res){
    const users = await UserServices.getAllUsers();
    res.status(200).json(users);
}

export async function getOneUser(req, res) {
    const { id } = req.params;
    const user = await UserServices.getOneUser(id);
    res.status(200).json(user)
}

export async function createUser(req, res) {
    const { name, lastName, email, password, role } = req.body;
    const newUser = await UserServices.createUser({ name, lastName, email, password, role });
    res.status(201).json(newUser);
}

export async function updateUser(req, res) {
    const { id } = req.params;
    const { name, lastName, email, password } = req.body;
    const updateUser = await UserServices.updateUser({ id, name, lastName, email, password });
    res.status(200).json(updateUser)
}
export async function deleteUser(req, res) {
    const { id } = req.params;
    const deleteUser = await UserServices.deleteUser(id);
    res.status(200).json({message: 'usuario eliminado con éxito', user: deleteUser})
}