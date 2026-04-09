import ProductServices from "../services/product.services.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await ProductServices.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ status: 'Error', message: error.message });
    }
};

export const getOneProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductServices.getOneProduct(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({ status: 'Error', message: error.message });
    }
};

export const searchProducts = async (req, res) => {
    try {
        const { q } = req.query; 
        if (!q) return res.status(200).json([]);
        
        const products = await ProductServices.searchProducts(q);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ status: 'Error', message: 'Error buscando productos' });
    }
};

export const createProduct = async (req, res) => {
    try {
        // Asumiendo que usas un middleware de validación Zod previo a esto. 
        // Si no lo usas, los datos vienen validados desde req.body
        const newProduct = await ProductServices.createProduct(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ status: 'Error', message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await ProductServices.updateProduct(id, req.body);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ status: 'Error', message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await ProductServices.deleteProduct(id);
        res.status(200).json({ status: 'Success', message: 'Producto eliminado correctamente' });
    } catch (error) {
        // Si tiene ventas asociadas, Prisma tirará error de Foreign Key.
        if (error.code === 'P2003') {
            return res.status(400).json({ 
                status: 'Error', 
                message: 'No puedes eliminar este producto porque ya tiene ventas asociadas.' 
            });
        }
        res.status(500).json({ status: 'Error', message: error.message });
    }
};