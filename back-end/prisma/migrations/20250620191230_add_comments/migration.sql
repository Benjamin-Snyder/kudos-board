-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "comments" TEXT[] DEFAULT ARRAY[]::TEXT[];
