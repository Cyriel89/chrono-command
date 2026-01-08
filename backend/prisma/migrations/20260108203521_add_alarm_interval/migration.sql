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
    "manualOffset" INTEGER NOT NULL DEFAULT 0,
    "alarmInterval" INTEGER NOT NULL DEFAULT 60
);
INSERT INTO "new_Clock" ("createdAt", "id", "manualOffset", "name", "room", "status", "timeShift") SELECT "createdAt", "id", "manualOffset", "name", "room", "status", "timeShift" FROM "Clock";
DROP TABLE "Clock";
ALTER TABLE "new_Clock" RENAME TO "Clock";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
