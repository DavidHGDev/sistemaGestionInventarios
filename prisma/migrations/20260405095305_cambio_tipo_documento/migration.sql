/*
  Warnings:

  - Changed the type of `tipoDocument` on the `Client` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TipoDocument" AS ENUM ('CC', 'TI', 'CE', 'PPT', 'NIP');

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "tipoDocument",
ADD COLUMN     "tipoDocument" "TipoDocument" NOT NULL;
