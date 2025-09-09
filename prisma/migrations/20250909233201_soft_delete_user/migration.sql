/*
  Warnings:

  - Added the required column `bookAuthor` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bookTitle` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bookYear` to the `Loan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Loan" ADD COLUMN     "bookAuthor" TEXT NOT NULL,
ADD COLUMN     "bookTitle" TEXT NOT NULL,
ADD COLUMN     "bookYear" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE INDEX "User_name_idx" ON "public"."User"("name");
