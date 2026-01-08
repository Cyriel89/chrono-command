/*
  Warnings:

  - You are about to drop the column `timeshift` on the `Clock` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Clock" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "room" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'OK',
    "timeShift" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "manualOffset" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Clock" ("createdAt", "id", "name", "room", "status") SELECT "createdAt", "id", "name", "room", "status" FROM "Clock";
DROP TABLE "Clock";
ALTER TABLE "new_Clock" RENAME TO "Clock";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
