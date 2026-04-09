import ProviderServices from "../services/provider.services.js";

export const getAllProviders = async (req, res) => {
    try {
        const providers = await ProviderServices.getAllProviders();
        res.status(200).json(providers);
    } catch (error) {
        res.status(500).json({ status: 'Error', message: error.message });
    }
};

export const getOneProvider = async (req, res) => {
    try {
        const { id } = req.params;
        const provider = await ProviderServices.getOneProvider(id);
        res.status(200).json(provider);
    } catch (error) {
        res.status(404).json({ status: 'Error', message: error.message });
    }
};

export const searchProviders = async (req, res) => {
    try {
        const { q } = req.query; 
        if (!q) return res.status(200).json([]);
        
        const providers = await ProviderServices.searchProviders(q);
        res.status(200).json(providers);
    } catch (error) {
        res.status(500).json({ status: 'Error', message: 'Error buscando proveedores' });
    }
};

export const createProvider = async (req, res) => {
    try {
        const newProvider = await ProviderServices.createProvider(req.body);
        res.status(201).json(newProvider);
    } catch (error) {
        res.status(500).json({ status: 'Error', message: error.message });
    }
};

export const updateProvider = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProvider = await ProviderServices.updateProvider(id, req.body);
        res.status(200).json(updatedProvider);
    } catch (error) {
        res.status(500).json({ status: 'Error', message: error.message });
    }
};

export const deleteProvider = async (req, res) => {
    try {
        const { id } = req.params;
        await ProviderServices.deleteProvider(id);
        res.status(200).json({ status: 'Success', message: 'Proveedor eliminado' });
    } catch (error) {
        res.status(500).json({ status: 'Error', message: error.message });
    }
};