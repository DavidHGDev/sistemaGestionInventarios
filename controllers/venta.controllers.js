import ventaServices from "../services/venta.services.js";

export async function getAllVenta(req, res) {
    try {
        const ventas = await ventaServices.getAllVenta();
        res.status(200).json(ventas)
    } catch (error) {
        res.status(500).json({
            status: 'Error',
            message: error.message
        })
    }
}

export async function crearVentaConStock(req, res) {
    try {
        const { clientId, userId, items } = req.body;
        const data = await ventaServices.crearVentaConStock( clientId, userId, items );
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({
            status: 'Error',
            message: error.message
        })
    }
}

export async function updateVenta(req, res) {
    try {
        const { id } = req.params;
        const { userId, items } = req.body;
        if (!items || items.length === 0) {
            return res.status(400).json({ 
                status: 'Error', 
                message: 'El carrito no puede estar vacío.' 
            });
        }
        console.log(items)
        const update = await ventaServices.modificarVenta( id, userId, items );
        res.status(201).json(update);
    } catch (error) {
        res.status(500).json({ status: 'Error', message: error.message })
    }
}