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