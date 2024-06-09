/*
  Warnings:

  - Made the column `categoryId` on table `Expense` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_categoryId_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "uncategorized" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Expense" ALTER COLUMN "categoryId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
