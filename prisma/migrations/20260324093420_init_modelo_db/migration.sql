/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuarios` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Usuarios";

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Products" (
    "id" SERIAL NOT NULL,
    "nameProduct" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ventas" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "saldoTotal" DOUBLE PRECISION NOT NULL,
    "clientId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Ventas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categorys" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Categorys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Credits" (
    "id" SERIAL NOT NULL,
    "totalCredit" DOUBLE PRECISION NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clientId" INTEGER NOT NULL,

    CONSTRAINT "Credits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clients" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "document" INTEGER NOT NULL,
    "tipoDocument" TEXT NOT NULL,

    CONSTRAINT "Clients_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categorys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ventas" ADD CONSTRAINT "Ventas_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ventas" ADD CONSTRAINT "Ventas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credits" ADD CONSTRAINT "Credits_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
