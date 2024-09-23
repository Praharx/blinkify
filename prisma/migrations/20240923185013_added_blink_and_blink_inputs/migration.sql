/*
  Warnings:

  - Added the required column `amount` to the `Blink` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blinkDescription` to the `Blink` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blinkName` to the `Blink` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagePreview` to the `Blink` table without a default value. This is not possible if the table is not empty.
  - Added the required column `submitText` to the `Blink` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blink" ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "blinkDescription" TEXT NOT NULL,
ADD COLUMN     "blinkName" TEXT NOT NULL,
ADD COLUMN     "imagePreview" TEXT NOT NULL,
ADD COLUMN     "submitText" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "SelectedOptions" (
    "id" TEXT NOT NULL,
    "blinkId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "options" TEXT[],

    CONSTRAINT "SelectedOptions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SelectedOptions" ADD CONSTRAINT "SelectedOptions_blinkId_fkey" FOREIGN KEY ("blinkId") REFERENCES "Blink"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
