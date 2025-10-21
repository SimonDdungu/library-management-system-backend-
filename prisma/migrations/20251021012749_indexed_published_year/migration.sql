-- DropIndex
DROP INDEX "public"."Book_author_title_idx";

-- CreateIndex
CREATE INDEX "Book_author_title_published_year_idx" ON "public"."Book"("author", "title", "published_year");
