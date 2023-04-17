/*
  Warnings:

  - A unique constraint covering the columns `[recoverToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_recoverToken_key" ON "User"("recoverToken");
