-- CreateTable
CREATE TABLE "synonym" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "group_id" TEXT NOT NULL,
    "word" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "synonym_word_key" ON "synonym"("word");

-- CreateIndex
CREATE INDEX "synonym_group_id_idx" ON "synonym"("group_id");

-- CreateIndex
CREATE INDEX "synonym_word_idx" ON "synonym"("word");
