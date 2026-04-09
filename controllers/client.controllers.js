import clientServices from "../services/client.services.js";

export async function getAllClients(req, res) {
    try {
        const data = await clientServices.getAllClients();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            status: 'Error', 
            message: error.message
        })
    }
}

export const searchClients = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) return res.status(200).json([]);
        const clientes = await clientServices.searchClients(q);
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ status: 'Error', message: 'Error buscando clientes' });
    }
};

export async function getOneClients(req, res) {
    try {
        const { id } = req.params;
        const client = await clientServices.getOneClient(id);
        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ status: 'Error', message: error.message })
    }
}

export async function createClient(req, res) {
    try {
        const { name, phone, email, document, tipoDocument } = req.body;
        const client = await clientServices.createClient({ name, tipoDocument, document, email, phone });
        res.status(201).json(client);

    } catch (error) {
        res.status(500).json({ status: 'Error', message: error.message })
    }
}

export async function updateClient(req, res) {
    try {
        const { id } = req.params;
        const { name, phone, email, document, tipoDocument } = req.body;
        const client = await clientServices.updateClient({ id, name, tipoDocument, document, email, phone });
        res.status(201).json(client);
    } catch (error) {
        res.status(500).json({ status: 'Error', message: error.message })
    }
}

export async function deleteClient(req, res) {
    try {
        const { id } = req.params;
        const delet = await clientServices.deleteClient(id);
        res.status(200).json({status: `se eliminó el usuario con ${id}`, user: delet});
    } catch (error) {
        res.status(500).json({ status: 'Error', message: error.message })
    }
}

