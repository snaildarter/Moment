-- CreateTable
CREATE TABLE "DiaryEntry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "date" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Todo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "priority" INTEGER NOT NULL DEFAULT 3,
    "category" TEXT,
    "dueDate" INTEGER,
    "createdAt" INTEGER NOT NULL,
    "updatedAt" INTEGER
);

-- CreateTable
CREATE TABLE "Finance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "amount" DECIMAL NOT NULL,
    "type" TEXT NOT NULL,
    "date" INTEGER NOT NULL,
    "description" TEXT
);
