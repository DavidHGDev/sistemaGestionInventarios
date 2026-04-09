import ventaServices from "../services/venta.services.js";

export async function getAllVenta(req, res) {
    try {
        const ventas = await ventaServices.getAllVenta();
        res.status(200).json(ventas);
    } catch (error) {
        res.status(500).json({
            status: 'Error',
            message: error.message
        });
    }
}

export async function getOneVenta(req, res) {
    try {
        const { id } = req.params;
        const venta = await ventaServices.getOneVenta(id);
        res.status(200).json(venta);
    } catch (error) {
        res.status(404).json({ status: 'Error', message: error.message });
    }
}

export async function crearVentaConStock(req, res) {
    try {
        // 🛡️ Extraemos clientId, isContado e items del body (lo que envía el frontend)
        const { clientId, items, isContado } = req.body;
        
        // 🛡️ Extraemos userId del token directamente (Seguridad máxima)
        // Nota: Asegúrate de que tu middleware decodifica el token en req.user
        const userId = req.usuario.id; 

        if (!items || items.length === 0) {
            return res.status(400).json({ status: 'Error', message: 'El carrito no puede estar vacío.' });
        }

        const data = await ventaServices.crearVentaConStock( clientId, userId, items, isContado );
        res.status(201).json(data);
    } catch (error) {
        // Si el error es de inventario, devolvemos un 400 (Bad Request), si no, un 500.
        const statusCode = error.message.includes('Falta stock') || error.message.includes('no existe') ? 400 : 500;
        res.status(statusCode).json({
            status: 'Error',
            message: error.message
        });
    }
}

export async function updateVenta(req, res) {
    try {
        const { id } = req.params;
        const { items, isContado } = req.body; // 🛡️ Recibimos isContado
        const userId = req.usuario.id; // 🛡️ ID del token

        if (!items || items.length === 0) {
            return res.status(400).json({ 
                status: 'Error', 
                message: 'El carrito no puede estar vacío.' 
            });
        }
        
        const update = await ventaServices.modificarVenta( id, userId, items, isContado );
        res.status(201).json(update);
    } catch (error) {
        const statusCode = error.message.includes('Falta stock') || error.message.includes('no existe') ? 400 : 500;
        res.status(statusCode).json({ status: 'Error', message: error.message });
    }
}