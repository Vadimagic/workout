/*
  Warnings:

  - You are about to drop the column `repeat` on the `Exercise_time` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Exercise_time" DROP COLUMN "repeat",
ADD COLUMN     "reps" INTEGER NOT NULL DEFAULT 0;
