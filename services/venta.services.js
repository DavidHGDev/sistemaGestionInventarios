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
            
            // 📝 1. LA LIBRETA DE NOTAS (Nueva)
            const erroresDeInventario = []; 

            for(const item of items){
                const producto = await tx.products.findUnique({
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
                    precioVendido: producto.price
                });

                await tx.products.update({
                    where: {id: Number(item.productId)},
                    data: { stock: { decrement: Number(item.cantidadVendida) } }
                });
            }

            // 🚨 4. EL REVISOR FINAL: ¿Hubo algún problema en la revisión?
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
}

export default new VentaServices();