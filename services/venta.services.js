import { prisma } from "../lib/prisma.js";

class VentaServices {

    async getAllVenta(){
        return await prisma.venta.findMany({
            include: { detalleVenta: true }
        })
    }

    async crearVentaConStock(clientId, userId, items){
        return await prisma.$transaction( async(tx) => {
            let saldoTotal = 0;
            const detallesListos = [];
            
            // 1. LA LIBRETA DE NOTAS 
            const erroresDeInventario = []; 

            for(const item of items){
                const producto = await tx.product.findUnique({
                    where: { id: Number(item.productId)}
                });

                // 2. Anotamos si no existe y SALTAMOS al siguiente producto
                if(!producto){
                    erroresDeInventario.push(`El producto con ID ${item.productId} no existe.`);
                    continue; // 💡 'continue' le dice al ciclo: ignora lo de abajo y pasa al siguiente item
                }

                // 3. Anotamos si no hay stock y SALTAMOS al siguiente producto
                if(producto.stock < item.cantidadVendida) {
                    erroresDeInventario.push(`Falta stock de ${producto.nameProduct}: pides ${item.cantidadVendida} pero quedan ${producto.stock}.`);
                    continue; 
                }

                // Si llegó aquí, el producto está perfecto, hacemos la matemática
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

            // 🚨4. EL REVISOR FINAL: ¿Hubo algún problema en la revisión?
            if (erroresDeInventario.length > 0) {
                // Si la libreta tiene anotaciones, AHORA SÍ tiramos el error con todos los mensajes unidos
                throw new Error(erroresDeInventario.join(" | ")); 
            }

            // 5. Si la libreta está vacía, facturamos tranquilos
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
        });
    }

    async modificarVenta(ventaIdAntigua, userId, nuevosItems) {
        // 🚀 ABRIMOS LA SUPER TRANSACCIÓN: Todo o Nada
        return await prisma.$transaction(async (tx) => {
            
            // ==========================================
            // FASE 1: REVERSAR LA FACTURA VIEJA
            // ==========================================
            
            // 1. Buscamos la factura original en la base de datos
            const ventaAntigua = await tx.venta.findUnique({
                where: { id: Number(ventaIdAntigua) },
                include: { detalleVenta: true }
            });

            // 2. Validaciones de seguridad
            if (!ventaAntigua) {
                throw new Error("La venta que intentas modificar no existe.");
            }
            if (ventaAntigua.status === "ANULADA") {
                throw new Error("No puedes modificar una venta que ya fue anulada previamente.");
            }

            // 3. Devolver los productos viejos a la bodega (Incrementar stock)
            for (const detalle of ventaAntigua.detalleVenta) {
                await tx.product.update({
                    where: { id: detalle.productId },
                    data: { stock: { increment: Number(detalle.cantidadVendida) } }
                });
            }

            // 4. Sellar la factura vieja como ANULADA
            await tx.venta.update({
                where: { id: Number(ventaIdAntigua) },
                data: { status: "ANULADA" }
            });


            // ==========================================
            // FASE 2: PROCESAR EL NUEVO CARRITO
            // ==========================================
            
            let saldoTotal = 0;
            const detallesListos = [];
            const erroresDeInventario = []; // Nuestra libreta de notas

            // 5. Recorrer los nuevos items que mandó el frontend
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

                // Matemática y empaque
                saldoTotal += (producto.price * item.cantidadVendida);

                detallesListos.push({
                    productId: Number(item.productId),
                    cantidadVendida: Number(item.cantidadVendida),
                    precioVendido: producto.price
                });

                // 6. Sacar los nuevos productos de la bodega (Decrementar stock)
                await tx.product.update({
                    where: { id: Number(item.productId) },
                    data: { stock: { decrement: Number(item.cantidadVendida) } }
                });
            }

            // ==========================================
            // FASE 3: VEREDICTO FINAL Y CREACIÓN
            // ==========================================

            // 7. Si hubo errores en la fase 2, rompemos la transacción aquí.
            // ¡Esto cancela TODO! La factura vieja vuelve a estar ACTIVA y el stock no se toca.
            if (erroresDeInventario.length > 0) {
                throw new Error(erroresDeInventario.join(" | "));
            }

            // 8. Si todo está perfecto, emitimos la NUEVA factura
            const nuevaVenta = await tx.venta.create({
                data: {
                    clientId: ventaAntigua.clientId, // Mantenemos el mismo cliente
                    userId: Number(userId),          // El cajero que está haciendo la modificación
                    saldoTotal: saldoTotal,
                    detalleVenta: {
                        create: detallesListos
                    }
                },
                include: { detalleVenta: true }
            });

            return nuevaVenta; // Devolvemos la factura impecable
        });
    }
}

export default new VentaServices();