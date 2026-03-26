/*
  Warnings:

  - Added the required column `cantidadVendida` to the `Detalle_venta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precioVendido` to the `Detalle_venta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Detalle_venta" ADD COLUMN     "cantidadVendida" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "precioVendido" DOUBLE PRECISION NOT NULL;
