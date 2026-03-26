-- CreateTable
CREATE TABLE "Detalle_venta" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "ventaId" INTEGER NOT NULL,

    CONSTRAINT "Detalle_venta_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Detalle_venta" ADD CONSTRAINT "Detalle_venta_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detalle_venta" ADD CONSTRAINT "Detalle_venta_ventaId_fkey" FOREIGN KEY ("ventaId") REFERENCES "Ventas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
