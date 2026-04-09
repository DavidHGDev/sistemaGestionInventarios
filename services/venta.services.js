import { prisma } from "../lib/prisma.js";

class VentaServices {

    async getAllVenta(){
        return await prisma.venta.findMany({
            include: { detalleVenta: true, client: true, user: true }
        })
    }

    async getOneVenta(id) {
        const venta = await prisma.venta.findUnique({
            where: { id: Number(id) },
            include: {
                detalleVenta: true,
                client: true,
                user: true
            }
        });

        if (!venta) throw new Error("Venta no encontrada");
        return venta;
    }
    // 🛠️ Añadimos isContado como parámetro
    async crearVentaConStock(clientId, userId, items, isContado){
        return await prisma.$transaction( async(tx) => {
            let saldoTotal = 0;
            const detallesListos = [];
            const erroresDeInventario = []; 

            for(const item of items){
                const producto = await tx.product.findUnique({
                    where: { id: Number(item.productId)}
                });

                if(!producto){
                    erroresDeInventario.push(`El producto con ID ${item.productId} no existe.`);
                    continue; 
                }

                if(producto.stock < item.cantidadVendida) {
                    erroresDeInventario.push(`Falta stock de ${producto.nameProduct}: pides ${item.cantidadVendida} pero quedan ${producto.stock}.`);
                    continue; 
                }

                saldoTotal += (producto.price * item.cantidadVendida);
                detallesListos.push({
                    productId: Number(item.productId),
                    cantidadVendida: Number(item.cantidadVendida),
                    precioVendido: (producto.price)
                });

                await tx.product.update({
                    where: {id: Number(item.productId)},
                    data: { stock: { decrement: Number(item.cantidadVendida) } }
                });
            }

            if (erroresDeInventario.length > 0) {
                throw new Error(erroresDeInventario.join(" | ")); 
            }

            // 🛠️ CORRECCIÓN: tx.venta (singular) y añadimos isContado
            const nuevaVenta = await tx.venta.create({
                data: {
                    clientId: Number(clientId),
                    userId: Number(userId),
                    saldoTotal: saldoTotal,
                    isContado: isContado, // Guardamos si fue crédito o contado
                    detalleVenta: {
                        create: detallesListos
                    }
                }, 
                include: { detalleVenta: true }
            });

            return nuevaVenta;
        });
    }

    // 🛠️ Añadimos isContado como parámetro
    async modificarVenta(ventaIdAntigua, userId, nuevosItems, isContado) {
        return await prisma.$transaction(async (tx) => {
            
            const ventaAntigua = await tx.venta.findUnique({
                where: { id: Number(ventaIdAntigua) },
                include: { detalleVenta: true }
            });

            if (!ventaAntigua) throw new Error("La venta que intentas modificar no existe.");
            if (ventaAntigua.status === "ANULADA") throw new Error("No puedes modificar una venta anulada.");

            for (const detalle of ventaAntigua.detalleVenta) {
                await tx.product.update({
                    where: { id: detalle.productId },
                    data: { stock: { increment: Number(detalle.cantidadVendida) } }
                });
            }

            await tx.venta.update({
                where: { id: Number(ventaIdAntigua) },
                data: { status: "ANULADA" }
            });

            let saldoTotal = 0;
            const detallesListos = [];
            const erroresDeInventario = []; 

            for (const item of nuevosItems) {
                const producto = await tx.product.findUnique({
                    where: { id: Number(item.productId) }
                });

                if (!producto) {
                    erroresDeInventario.push(`El producto ID ${item.productId} no existe.`);
                    continue; 
                }

                if (producto.stock < item.cantidadVendida) {
                    erroresDeInventario.push(`Falta stock de ${producto.nameProduct}: pides ${item.cantidadVendida} pero quedan ${producto.stock}.`);
                    continue;
                }

                saldoTotal += (producto.price * item.cantidadVendida);

                detallesListos.push({
                    productId: Number(item.productId),
                    cantidadVendida: Number(item.cantidadVendida),
                    precioVendido: producto.price
                });

                await tx.product.update({
                    where: { id: Number(item.productId) },
                    data: { stock: { decrement: Number(item.cantidadVendida) } }
                });
            }

            if (erroresDeInventario.length > 0) {
                throw new Error(erroresDeInventario.join(" | "));
            }

            // 🛠️ Añadimos isContado en la nueva venta
            const nuevaVenta = await tx.venta.create({
                data: {
                    clientId: ventaAntigua.clientId, 
                    userId: Number(userId),          
                    saldoTotal: saldoTotal,
                    isContado: isContado, // Guardamos el nuevo estado de pago
                    detalleVenta: {
                        create: detallesListos
                    }
                },
                include: { detalleVenta: true }
            });

            return nuevaVenta; 
        });
    }
}

export default new VentaServices();