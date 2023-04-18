/*
  Warnings:

  - Added the required column `document` to the `Balance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Balance" ADD COLUMN     "document" TEXT NOT NULL;
