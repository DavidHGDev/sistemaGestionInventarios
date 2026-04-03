/*
  Warnings:

  - A unique constraint covering the columns `[document]` on the table `Client` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'VENDEDOR', 'AUDITOR');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'VENDEDOR';

-- AlterTable
ALTER TABLE "Venta" ADD COLUMN     "isContado" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "Client_document_key" ON "Client"("document");
