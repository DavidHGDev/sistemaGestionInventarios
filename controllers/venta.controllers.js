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