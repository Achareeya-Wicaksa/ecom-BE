/*
  Warnings:

  - You are about to drop the `Cart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productBrand` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productDescription` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productImage` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productName` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productStock` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productWeight` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_cartId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_orderId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_productId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "productBrand" TEXT NOT NULL,
ADD COLUMN     "productDescription" TEXT NOT NULL,
ADD COLUMN     "productImage" TEXT NOT NULL,
ADD COLUMN     "productName" TEXT NOT NULL,
ADD COLUMN     "productStock" INTEGER NOT NULL,
ADD COLUMN     "productWeight" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Cart";

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "User";
