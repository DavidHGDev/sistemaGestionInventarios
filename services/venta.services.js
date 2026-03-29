import { prisma } from "../lib/prisma.js";

class VentaServices {

    async getAllVenta(){
        return await prisma.ventas.findMany({
            include: { detalleVenta: true }
        })
    }

    async crearVentaConStock(clientId, userId, items){
        return await prisma.$transaction( async(tx) => {
            let saldoTotal = 0;
            const detallesListos = [];

            //Empezamos por recorrer cada producto que el cliente desea comprar. 
            for(const item of items){
                //1) buscamos el producto real en la base de datos
                const producto = await tx.products.findUnique({
                    where: { id: Number(item.productId)}
                })

                if(!producto){
                    throw new Error('Producto no encontrado')
                }

                //2) validar si hay sufiente inventario de ese producto, vital para no romper el sistema
                if(producto.stock < item.cantidadVendida) {
                    throw new Error(`Stock insuficiente para ${producto.nameProduct}. Quedan ${producto.stock}.`)
                }

                //3) aquí calculamos el dinero y lo sumamos al total 
                saldoTotal += (producto.price * item.cantidadVendida);

                //4) preparamos el paquete de detalleVenta
                detallesListos.push({
                    productId: item.productId,
                    cantidadVendida: item.cantidadVendida,
                    precioVendido: producto.price
                })

                //5) lo elegente de PRISMA, decrement, para descontar en stock.
                await tx.products.update({
                    where: {id: Number(item.productId)},
                    data: {
                        stock: { decrement: Number(item.cantidadVendida) }
                    }
                })
            }

            //Por último, creamos la venta con el stock organizado y los datalles de venta
            const nuevaVenta = await tx.ventas.create({
                data: {
                    clientId: Number(clientId),
                    userId: Number(userId),
                    saldoTotal: saldoTotal,

                    //creación anidada de los detalles
                    detalleVenta: {
                        create: detallesListos
                    }
                }, 
                //aquí regresamos la relación con los detalles de la venta completos. 
                include: { detalleVenta: true }
            });
            return nuevaVenta;
        })
    }
}

export default new VentaServices();