import categoryServices from "../services/category.services.js";

export async function getAllCategories(req, res) {
    try {
        const data = await categoryServices.getAllCategories();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ status: 'Error', message: error.message });
    }
}

export async function getOneCategory(req, res) {
    try {
        const { id } = req.params;
        const category = await categoryServices.getOneCategory(id);
        res.status(200).json(category);
    } catch (error) {
        res.status(404).json({ status: 'Error', message: error.message });
    }
}

export async function createCategory(req, res) {
    try {
        const { name, description } = req.body;
        const category = await categoryServices.createCategory({ name, description });
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ status: 'Error', message: error.message });
    }
}

export async function updateCategory(req, res) {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const category = await categoryServices.updateCategory(id, { name, description });
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ status: 'Error', message: error.message });
    }
}

export async function deleteCategory(req, res) {
    try {
        const { id } = req.params;
        const delet = await categoryServices.deleteCategory(id);
        res.status(200).json({ status: "Categoría eliminada con éxito", category: delet });
    } catch (error) {
        // Si es el error de que tiene productos asociados, devolvemos un 400 Bad Request
        const statusCode = error.message.includes('No se puede eliminar') ? 400 : 500;
        res.status(statusCode).json({ status: 'Error', message: error.message });
    }
}